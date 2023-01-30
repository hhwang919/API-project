const express = require('express')
const router = express.Router();

const { Spot, User, sequelize, SpotImage, Review, ReviewImage } = require('../../db/models');
const review = require('../../db/models/review');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');


//Get All reviews

router.get('/', async(req, res)=>{
    const review = await Review.findAll();
    return res.json(review)
})


//Get all reviews by current user 
router.get('/current', requireAuth, async(req, res)=>{
    const userId = req.user.id
    // console.log(userId)
    const cUser  = await Review.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price'],
                include: [
                    {
                        as: 'previewImage',
                        model: SpotImage,
                        attributes: ['url']
                    }
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
  
    });
    return res.json( { Reviews: cUser });

});

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params;

    const review = await Review.findByPk(reviewId);   

    // Check Review exist
    if(!review){ 
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }   
    
    // Check review belong to user
    if(review.userId !== req.user.id){
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
        res.status(403);
        return ;
    }

    const { url } = req.body;
    //console.log(url)

    if (!url || url === '') {
        res.json({
            message: "url is required",
            statusCode: 404
        })
        res.status(404);
        return ;
    }

    const countImage = await ReviewImage.count({ where: { reviewId: reviewId }});

    console.log("count Image: ", countImage)

    if (countImage >= 10) {
        res.json ({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
        res.status(403);
        return;
    }

 
    const newReviewImage = await ReviewImage.create ({
        reviewId: reviewId,
        url: url
    })

    res.status(200);
    return res.json(newReviewImage); 
});



// Delete a review
router.delete('/:id', async (req, res, next) => {
    const reviews = await Review.findByPk(req.params.id);   

    // Check Review exist
    if(!reviews){ 
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }   
    
    // Check Booking belong to user
    if(reviews.userId !== req.user.id){
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
        res.status(403);
        return ;
    }

    
    if (reviews) {
        await reviews.destroy();
        res.status(200)
         res.json({ message: 'Successfully deleted' });
    } else {
        res.status(404)
        res.json({ message: "Review  couldn't be found"
        })
    }
});

// ### Edit a Review
// Update and return an existing review.
// Review must belong to current user

router.put('/:id', requireAuth, async (req, res) => {
    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };
 
    let { review, stars } = req.body;

    const updateReview = await Review.findByPk(req.params.id);  
 
    // Check Review exist
    if(!updateReview){
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }
    
    // Check Review belong to user
    if(updateReview.userId !== req.user.id){
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
        res.status(403);
        return ;
    }

    if(review && review !== '') {
        updateReview.review = review;
    }
    else {
        errorResult.errors.push("Review text is required");
    }
    
 // takes care of when stars are 0
    if (stars === 0) stars = -1;  
    if (stars) {
        if ( !isNaN(stars) && stars >= 1 && stars <= 5 ) {
            updateReview.stars = stars;
        }
        else {
            errorResult.errors.push("Stars must be an integer from 1 to 5");
        }
    }

    if(errorResult.errors.length) {
        res.status(400);
        res.json(errorResult);
        return;
    }

    await updateReview.save();

    res.json( updateReview );

});



module.exports = router;
const express = require('express')
const router = express.Router();

const { Spot, User, sequelize, SpotImage, Review, ReviewImage } = require('../../db/models');
// const { Spot, User, Review, ReviewImage, sequelize } = require('../../db/models');
//const review = require('../../db/models/review');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const validateReviewImage = [
    check('url', 'url is required')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isURL({checkFalsy: true}),
    handleValidationErrors
];

const validateReview = [
    check('review', 'Review text is required')
        .exists({ checkFalsy: true })
        .notEmpty(),
    check('stars', 'Stars must be an integer from 1 to 5')
        .exists({ checkFalsy: true })
        .isInt({min: 1, max: 5})
        .notEmpty(),
    handleValidationErrors
];

//### Get All reviews

router.get('/', async(req, res)=>{
    const review = await Review.findAll();
    return res.json(review)
})


// /### Get all reviews by current user 
router.get('/current', requireAuth, async(req, res)=>{
    const userId = req.user.id
    // console.log(userId)
    
    // method 1 benchmark: GET /api/reviews/current 200 28.296 ms - 3177
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
                        attributes: ['url', 'preview']
                    }
                ]

                // attributes: [
                //     'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price',
                //     [sequelize.literal(`COALESCE((
                //         SELECT "url"
                //         FROM "SpotImages"
                //         WHERE "SpotImages"."spotId" = "Spot"."id"
                //         AND "preview" = true
                //         ORDER BY "SpotImages"."id" ASC
                //         LIMIT 1 
                //         ), '')`), 'previewImage'
                //     ]
                // ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url'],
                order: [['ReviewImage.id', 'ASC']]
            }
        ]
    });
    
   

    const results = cUser.map((review) =>({
        id: review.id,
        spotId: review.spotId,
        userId: review.userId,
        review: review.review,
        stars: review.stars,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        Users: review.User,
        Spot: { id: review.Spot.id,
                ownerId: review.Spot.ownerId,
                address: review.Spot.address,
                city: review.Spot.city,
                state: review.Spot.state,
                country: review.Spot.country,
                lat:review.Spot.lat,
                lng:review.Spot.lng,
                name:review.Spot.name,
                description: review.Spot.description,
                price: review.Spot.price,
                previewImage: review.Spot.previewImage.length > 0 ? review.Spot.previewImage.filter(el => el.preview)[0]['url'] : ""},
        ReviewImages: review.ReviewImages
        }),
    );

     
    res.status(200);
    //return res.json( { Reviews: cUser });
    return res.json( { Reviews: results });

});
//### Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, validateReviewImage, async (req, res, next) => {
    const { reviewId } = req.params;

    const review = await Review.findByPk(reviewId);   

    // Check Review exist
    if(!review){ 
        const err = new Error("Review couldn't be found");
        err.status = 404;
        err.title = "Review couldn't be found";
        return next(err);

        // res.json({
        //     message: "Review couldn't be found",
        //     statusCode: 404
        // })
        // res.status(404);
        // return ;
    }   
    
    // Review must belong to the current user
    if(review.userId !== req.user.id){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Forbidden";
        return next(err);
    //     res.json({
    //         message: "Forbidden",
    //         statusCode: 403
    //     })
    //     res.status(403);
    //     return ;
    }

    const { url } = req.body;
    //console.log(url)

    // if (!url || url === '') {
    //     res.json({
    //         message: "url is required",
    //         statusCode: 404
    //     })
    //     res.status(404);
    //     return ;
    // }

    const countImage = await ReviewImage.count({ where: { reviewId: reviewId }});

    console.log("count Image: ", countImage)

    if (countImage >= 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
        err.title = "Maximum number of images for this resource was reached";
        return next(err);
        // res.json ({
        //     "message": "Maximum number of images for this resource was reached",
        //     "statusCode": 403
        // })
        // res.status(403);
        // return;
    }

 
    const newReviewImage = await ReviewImage.create ({
        reviewId: reviewId,
        url: url
    })

    res.status(200);
    return res.json({id: newReviewImage.id, url: newReviewImage.url}); 
});


// ### Edit a Review
// Update and return an existing review.
// Review must belong to current user

router.put('/:id', requireAuth, validateReview, async (req, res, next) => {
    //let errorResult = { message: "Validation error", statusCode: 400, errors: [] };
 
    let { review, stars } = req.body;

    const updateReview = await Review.findByPk(req.params.id);  
 
    // Check Review exist
    if(!updateReview){
        const err = new Error("Review couldn't be found");
        err.status = 404;
        err.title = "Review couldn't be found";
        return next(err);
        // res.json({
        //     message: "Review couldn't be found",
        //     statusCode: 404
        // })
        // res.status(404);
        // return ;
    }
    
    // Review must belong to the current user
    if(updateReview.userId !== req.user.id){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Forbidden";
        return next(err);
        // res.json({
        //     message: "Forbidden",
        //     statusCode: 403
        // })
        // res.status(403);
        // return ;
    }

    // if(review && review !== '') {
    //     updateReview.review = review;
    // }
    // else {
    //     errorResult.errors.push("Review text is required");
    // }
    
 // takes care of when stars are 0
    // if (stars === 0) stars = -1;  
    // if (stars) {
    //     if ( !isNaN(stars) && stars >= 1 && stars <= 5 ) {
    //         updateReview.stars = stars;
    //     }
    //     else {
    //         errorResult.errors.push("Stars must be an integer from 1 to 5");
    //     }
    // }

    // if(errorResult.errors.length) {
    //     res.status(400);
    //     res.json(errorResult);
    //     return;
    // }

    updateReview.review = review;
    updateReview.stars = stars;

    await updateReview.save();

    res.json( updateReview );

});


// Delete a review
router.delete('/:id', requireAuth, async (req, res, next) => {
    const reviews = await Review.findByPk(req.params.id);   

    // Check Review exist
    if(!reviews){ 
        const err = new Error("Review couldn't be found");
        err.status = 404;
        err.title = "Review couldn't be found";
        return next(err);
    // res.json({
        //     message: "Review couldn't be found",
        //     statusCode: 404
        // })
        // res.status(404);
        // return ;
    }   
    
    //  Review must belong to the current user
    if(reviews.userId !== req.user.id){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = "Forbidden";
        return next(err);
        // res.json({
        //     message: "Forbidden",
        //     statusCode: 403
        // })
        // res.status(403);
        // return ;
    }

    
    if (reviews) {
        await reviews.destroy();
        res.status(200)
        res.json({ 
            message: 'Successfully deleted', 
            statusCode: 200
        });
    }
    // } else {
    //     res.status(404)
    //     res.json({ message: "Review  couldn't be found"
    //     })
    // }
});


module.exports = router;
const express = require('express')
const router = express.Router();

const { User, sequelize, ReviewImage, Review } = require('../../db/models');
//const reviewImage = require('../../db/models/reviewImage');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');



router.delete('/:id', requireAuth, async (req, res, next) => {

    const reviewImage = await ReviewImage.findByPk(req.params.id);
    
    // Check spot exist
    if(!reviewImage){
        res.json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }

    const review = await Review.findByPk(reviewImage.reviewId);

    // Check review exist
    if(!review){
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }
    

    // Check review belong to user
    if (review.userId !== req.user.id) {
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
        res.status(403);
        return ;
    }

    
    await reviewImage.destroy();
    
    res.json({
        message: "Successfully deleted.",
        statusCode: 200
    })
    res.status(200);
    return;

})

module.exports = router
const express = require('express')
const router = express.Router();

const { Spot, User, sequelize, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const review = require('../../db/models/review');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.delete('/:id', async (req, res, next) => {
    const spotImage = await SpotImage.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Spot,
            where: { ownerId: req.user.id}
        }]
    });

    console.log(spotImage)

    if (!spotImage) {
        res.json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }

    //await spotImage.destroy();
    
    res.json({
        message: "Successfully deleted.",
        statusCode: 200
    })
    res.status(200);
    return;
});

  module.exports = router;
  
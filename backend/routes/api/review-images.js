const express = require('express')
const router = express.Router();

const { Spot, User, sequelize, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const review = require('../../db/models/review');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.delete('/:id', async (req, res, next) => {
    const reviewImages = await ReviewImage.findByPk(req.params.id);
    
    if (reviewImages) {
        await reviewImages.destroy();
        res.status(200)
         res.json({ message: 'Successfully deleted' });
    } else {
        res.status(404)
        res.json({ message: "Review Image couldn't be found"
        })
    }
});

  module.exports = router;
  
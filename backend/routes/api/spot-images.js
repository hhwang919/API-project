const express = require('express')
const router = express.Router();

const { Spot, User, sequelize, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const review = require('../../db/models/review');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.delete('/:id', async (req, res, next) => {
    const spotImages = await SpotImage.findByPk(req.params.id);
    
    if (spotImages) {
        await spotImages.destroy();
        res.status(200)
         res.json({ message: 'Successfully deleted' });
    } else {
        res.status(404)
        res.json({ message: "Spot Image couldn't be found"
        })
    }
});

  module.exports = router;
  
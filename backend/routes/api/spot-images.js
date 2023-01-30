const express = require('express')
const router = express.Router();

const { User, sequelize, Spot, SpotImage } = require('../../db/models');
//const spotImage = require('../../db/models/spotimage');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');



router.delete('/:id', requireAuth, async (req, res, next) => {

    const spotImage = await SpotImage.findByPk(req.params.id);

    // Check spot exist
       if(!spotImage){
        res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }

    const spot = await Spot.findByPk(spotImage.spotId);

    // Check spot exist
    if(!spot){
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }
    

    // Check spot belong to user
    if (spot.ownerId !== req.user.id) {
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
        res.status(403);
        return ;
    }


    await spotImage.destroy();
    
    res.json({
        message: "Successfully deleted.",
        statusCode: 200
    })
    res.status(200);
    return;

})

module.exports = router
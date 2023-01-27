const express = require('express')
const router = express.Router();

const { Spot, User, sequelize, SpotImage, Review, Booking } = require('../../db/models');
const booking = require('../../db/models/booking');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//Get All bookings for testing
router.get('/', async(req, res)=>{
    const booking = await Booking.findAll();
    return res.json(booking)
})


//Get all of the Current User's Bookings
router.get('/current',  async(req, res)=>{
    const userId = req.user.id
    // console.log(userId)
    const cUser  = await Booking.findAll({where:{userId:userId}});
    return res.json(cUser);

});

// router.get('/current',  async(req, res)=>{
//     const userId = req.user.id
//     // console.log(userId)
//     const cUser  = await Review.findAll({where:{userId:userId}});
//     return res.json(cUser);

// });

module.exports = router
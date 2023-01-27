const express = require('express')
const router = express.Router();

const { Spot, User, sequelize, SpotImage, Review, Booking } = require('../../db/models');
const booking = require('../../db/models/booking');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

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


//edit a booking

// ### Edit a Booking
// Update and return an existing booking.

router.put('/:bookId', async (req, res) => {
    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    const { bookId } = req.params;

    const updateBooking = await Booking.findByPk(bookId);   

    if(!updateBooking){ 
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }

    let startDay;
    let endDay;

    let { startDate, endDate } = req.body;


    // console.log("startDate: ", startDate);
    // console.log(typeof(startDate))
    
    // console.log("startDate: ", startDate);
    // console.log(typeof(startDate))

    if(startDate && startDate !== '') {
        startDay = new Date(startDate);
    }
    else {
        errorResult.errors.push("Start Date is required");
    }
    
    if (endDate && endDate !== '') {
        endDay = new Date (endDate);
    }
    else {
        errorResult.errors.push("End Date is required");
    }

    if (startDate > endDate) {
        errorResult.errors.push("endDate cannot come before startDate");
    }

    let now = new Date();

    if(endDate < now) {
        res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
        res.status(403);
        return;
    }

    // Check Conflict
    //const bookingBySpot = await Booking.findAll(
     //   where: {
       //     spotId : updateBooking.spotId,
       //     endDate :
       // })

 
    updateBooking.startDate = startDay;
    updateBooking.endDate = endDay;
    
    if(errorResult.errors.length) {
        res.status(400);
        res.json(errorResult);
        return;
    }

    // await updateBooking.save();

    res.json({ updateBooking });

})

// router.get('/current',  async(req, res)=>{
//     const userId = req.user.id
//     // console.log(userId)
//     const cUser  = await Review.findAll({where:{userId:userId}});
//     return res.json(cUser);

// });

module.exports = router
const express = require('express')
const router = express.Router();

const { Spot, User, sequelize, SpotImage, Review, Booking } = require('../../db/models');
const booking = require('../../db/models/booking');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const moment = require('moment'); // require

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

//Create a booking






//edit a booking

/// ### Edit a Booking
// Update and return an existing booking.

router.put('/:bookId', async (req, res) => {
    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    const { bookId } = req.params;

    const updateBooking = await Booking.findByPk(bookId);   

    if(!updateBooking && !updateBooking.userId !== req.user.id){ 
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


    console.log("startDate: ", startDate);
    console.log(typeof(startDate))
    
    console.log("startDate: ", startDate);
    console.log(typeof(startDate))

    if(startDate && startDate !== '') {
        startDay = new Date(startDate);
    }
    else {
        errorResult.message = "Validation error";
        errorResult.statusCode = 400;    
        errorResult.errors.push("Start Date is required");
    }
    
    if (endDate && endDate !== '') {
        endDay = new Date (endDate);
    }
    else {
        errorResult.message = "Validation error";
        errorResult.statusCode = 400;    
        errorResult.errors.push("End Date is required");
    }

    if (startDay > endDay) {
        errorResult.message = "Validation error";
        errorResult.statusCode = 400;    
        errorResult.errors.push("endDate cannot come before startDate");
    }

    let now = new Date();
   
    if(endDay < now) {
        res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
        res.status(403);
        return;
    }

    if(errorResult.errors.length) {
        res.status(400);
        res.json(errorResult);
        return;
    }

    errorResult.message = "Sorry, this spot is already booked for the specified dates";
    errorResult.statusCode = 403;

    // Check Conflict
    const bookingBySpot = await Booking.findAll({
        where: {
            spotId : updateBooking.spotId
        },
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate']
    })

    //console.log(bookingBySpot);
     
    for(const obj of bookingBySpot) {
        console.log("obj: ", obj.startDate, obj.endDate);

        if ( startDay > obj.startDate && endDay < obj.endDate){
            errorResult.errors.push("Start date conflicts with an existing booking");
            errorResult.errors.push("End date conflicts with an existing booking");
            break;
        }
        else if ( startDay < obj.startDate && endDay > obj.endDate){
            errorResult.errors.push("Start date conflicts with an existing booking");
            errorResult.errors.push("End date conflicts with an existing booking");
            break
        }
        else if (startDay > obj.startDate && startDay < obj.endDate) {
            errorResult.errors.push("Start date conflicts with an existing booking");
            break;
        }
        else if (endDay > obj.startDate && endDay < obj.endDate) {
            errorResult.errors.push("End date conflicts with an existing booking");
            break;
        }
    }

    if(errorResult.errors.length) {
        res.status(400);
        res.json(errorResult);
        return;
    }
 
    updateBooking.startDate = startDay;
    updateBooking.endDate = endDay;
    
    
    await updateBooking.save();


    res.status(200);
    return res.json({ updateBooking });

})



//Delete a Booking
router.delete('/:id', async (req, res, next) => {
    const bookings = await Booking.findByPk(req.params.id);
    const now = new Date()
    let startDate;
    let endDate;
    if(now > startDate && now < endDate){
        res.status(404)
        res.json({message: "Bookings that have been started can't be deleted"})
}
    if (spots) {
        await spots.destroy();
        res.status(200)
        res.json({ message: 'Successfully deleted' });
    } else {
        res.status(404)
        res.json({ message: "Spot couldn't be found"})
    }
});




// router.get('/current',  async(req, res)=>{
//     const userId = req.user.id
//     // console.log(userId)
//     const cUser  = await Review.findAll({where:{userId:userId}});
//     return res.json(cUser);

// });

module.exports = router
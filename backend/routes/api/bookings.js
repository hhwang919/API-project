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
//Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res)=>{
    const userId = req.user.id
    // console.log(userId)
    const cUser  = await Booking.findAll({
        where: { userId: userId },
        include: [
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
            }
       ],
    });


    //return res.json(cUser);

    const result = cUser.map((booking) => {
        return {
            id: booking.id,
            spotId: booking.spotId,
            Spots: booking.Spot, 
            userId: booking.userId,   
            startDate: booking.startDate,
            enddate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }
    });

    return res.json({ Bookings: result });


});

// ### Edit a Booking
// Update and return an existing booking.

router.put('/:bookId', requireAuth, async (req, res) => {
    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    const { bookId } = req.params;

    //const updateBooking = await Booking.findByPk(bookId);   

    const updateBooking = await Booking.findOne({
        where: {
            id: bookId,
            userId: req.user.id
        }
    });


    if(!updateBooking){ // findByPk is differ from findOne, findAll
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }

    console.log("userId: ", updateBooking.userId);
    console.log("current user Id: ", req.user.id);
    if(updateBooking.userId !== req.user.id) { // if booking not belong current user
        res.json({
            message: "Booking doesn't belong to current user",
            statusCode: 404
        })
        res.status(404);
        return ;
    }


    let startDay;
    let endDay;

    let { startDate, endDate } = req.body;


    console.log("startDate: ", startDate, typeof(startDate))
    
    console.log("endDate: ", endDate, typeof(startDate))

    if(startDate && startDate !== '') {
        startDay = new Date(startDate);
    }
    else {
        // Delete : errorResult.message = "Validation error";
        //Delete :errorResult.statusCode = 400;    
        errorResult.errors.push("Start Date is required");
    }
    
    if (endDate && endDate !== '') {
        endDay = new Date (endDate);
    }
    else {
        //Delete :errorResult.message = "Validation error";
        //Delete :errorResult.statusCode = 400;    
        errorResult.errors.push("End Date is required");
    }

    if (startDay > endDay) {
        //Delete :errorResult.message = "Validation error";
        //Delete :errorResult.statusCode = 400;    
        errorResult.errors.push("endDate cannot come before startDate");
    }

    let now = new Date();
   
    if(startDay < now || endDay < now) {
        res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
        res.status(403);
        return;
    }

    if(errorResult.errors.length) {
        errorResult.message = "Validation error";
        errorResult.statusCode = 400;    
        res.status(400);
        res.json(errorResult);
        return;
    }

    // Delete : errorResult.message = "Sorry, this spot is already booked for the specified dates";
    // Delete: errorResult.statusCode = 403;

    // Check Conflict
    const bookingBySpot = await Booking.findAll({
        where: {
            spotId : updateBooking.spotId
        },
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate']
    })

    //console.log(bookingBySpot);
     
    for(const obj of bookingBySpot) {
        //console.log("obj: ", obj.id, obj.spotId, obj.startDate, obj.endDate, typeof(obj.startDate));
        if (obj.id === bookId) { continue }

        let noStartDay = new Date(obj.startDate) 
        let noEndDay = new Date(obj.endDate) 

        if ( startDay > noStartDay && endDay < noEndDay){
            errorResult.errors.push("Start date conflicts with an existing booking");
            errorResult.errors.push("End date conflicts with an existing booking");
            break;
        }
        else if ( startDay < noStartDay && endDay > noEndDay){
            errorResult.errors.push("Start date conflicts with an existing booking");
            errorResult.errors.push("End date conflicts with an existing booking");
            break
        }
        else if (startDay > noStartDay && startDay < noEndDay) {
            errorResult.errors.push("Start date conflicts with an existing booking");
            break;
        }
        else if (endDay > noStartDay && endDay < noEndDay) {
            errorResult.errors.push("End date conflicts with an existing booking");
            break;
        }
    }

    if(errorResult.errors.length) {
        errorResult.message = "Sorry, this spot is already booked for the specified dates";
        errorResult.statusCode = 403;
        res.status(403);
        res.json(errorResult);
        return;
    }
 
    updateBooking.startDate = startDate;    // this is string, don't use startDay
    updateBooking.endDate = endDate;        // this is string, don't use endDay
    
    
    //await updateBooking.save();   comment while test

    res.status(200);
    return res.json( updateBooking );
})



// ### Delete a Booking
router.delete('/:id',requireAuth, async (req, res, next) => {
    const deleteBooking = await Booking.findOne({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    });

    // user 1 has booking.id: 12, 15, 21
    if(!deleteBooking) {
        res.json({
            message: "Booking Couldn't be found",
            statusCode: 404
        });
        res.status(404);
        return;
    }

    //console.log(deleteBooking.startDate);
    const now = new Date();
    const startDay = new Date(deleteBooking.startDate);

    if (now >= startDay) { // Booking start day  before today
        res.json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        });
        res.status(403);
        return;
    }

    await deleteBooking.destroy();   //comment while test

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
    res.status(200);
    return;

})



// router.get('/current',  async(req, res)=>{
//     const userId = req.user.id
//     // console.log(userId)
//     const cUser  = await Review.findAll({where:{userId:userId}});
//     return res.json(cUser);

// });

module.exports = router
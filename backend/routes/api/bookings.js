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
                        attributes: ['url', 'preview']
                    }
                ]
            }
       ],
    });


    //return res.json(cUser);

    const result = cUser.map((booking) => {
        return {
            // id: booking.id,
            // spotId: booking.spotId,
            // Spots: booking.Spot, 
            // userId: booking.userId,   
            // startDate: booking.startDate,
            // enddate: booking.endDate,
            // createdAt: booking.createdAt,
            // updatedAt: booking.updatedAt

            id: booking.id,
            spotId: booking.spotId,
            Spot: { id: booking.Spot.id,
                ownerId: booking.Spot.ownerId,
                address: booking.Spot.address,
                city: booking.Spot.city,
                state: booking.Spot.state,
                country: booking.Spot.country,
                lat:booking.Spot.lat,
                lng:booking.Spot.lng,
                name:booking.Spot.name,
                description: booking.Spot.description,
                price: booking.Spot.price,
                previewImage: booking.Spot.previewImage.length > 0 ? booking.Spot.previewImage.filter(el => el.preview)[0]['url'] : ""},
                userId: booking.userId,
                startDate: booking.startDate,
                enddate: booking.endDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt,
        }
    });

    return res.json({ Bookings: result });


});

// router.get('/current',  async(req, res)=>{
//     const userId = req.user.id
//     // console.log(userId)
//     const cUser  = await Review.findAll({where:{userId:userId}});
//     return res.json(cUser);

// });


// ### Edit a Booking
// Update and return an existing booking.

router.put('/:bookId', requireAuth, async (req, res) => {
    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    const { bookId } = req.params;

    const updateBooking = await Booking.findByPk(bookId);   

    // Check Booking exist
    if(!updateBooking){ 
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }   
    
    // Check Booking belong to user
    if(updateBooking.userId !== req.user.id){
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
        res.status(403);
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
         errorResult.errors.push("Start Date is required");
    }
    
    if (endDate && endDate !== '') {
        endDay = new Date (endDate);
    }
    else {
        errorResult.errors.push("End Date is required");
    }

    if (startDay > endDay) {
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

    
    // Check Conflict
    const bookingBySpot = await Booking.findAll({
        where: {
            spotId : updateBooking.spotId
        },
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate']
    })

      
    for(const obj of bookingBySpot) {
        //console.log("obj: ", obj.id, obj.spotId, obj.startDate, obj.endDate, typeof(obj.startDate));
        if (obj.id === bookId) { continue }

        let bookedStartDay = new Date(obj.startDate) 
        let bookedEndDay = new Date(obj.endDate) 

        if ( startDay >= bookedStartDay && endDay <= bookedEndDay){
            errorResult.errors.push("Start date conflicts with an existing booking");
            errorResult.errors.push("End date conflicts with an existing booking");
            break;
        }
        else if ( startDay < bookedStartDay && endDay > bookedEndDay){
            errorResult.errors.push("Start date conflicts with an existing booking");
            errorResult.errors.push("End date conflicts with an existing booking");
            break
        }
        else if (startDay > bookedStartDay && startDay < bookedEndDay) {
            errorResult.errors.push("Start date conflicts with an existing booking");
            break;
        }
        else if (endDay > bookedStartDay && endDay < bookedEndDay) {
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
 
    updateBooking.startDate = startDate;   
    updateBooking.endDate = endDate;       
    
    
    await updateBooking.save();   

    res.status(200);
    return res.json( updateBooking );
})


// ### Delete a Booking
router.delete('/:id', requireAuth, async (req, res, next) => {
    const deleteBooking = await Booking.findByPk(req.params.id);   

    // Check Booking exist
    if(!deleteBooking){ 
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }   
    
    // Check Booking belong to user
    if(deleteBooking.userId !== req.user.id){
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
        res.status(403);
        return ;
    }


    //console.log(deleteBooking.startDate);
    const now = new Date();
    const startDay = new Date(deleteBooking.startDate);

    if (now >= startDay) {
        res.json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        });
        res.status(403);
        return;
    }

    await deleteBooking.destroy();  

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
    res.status(200);
    return;

})


module.exports = router
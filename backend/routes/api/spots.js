const express = require('express')
const router = express.Router();

const { Spot, User, sequelize, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const review = require('../../db/models/review');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const booking = require('../../db/models/booking');



const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Please enter valid address'),
    handleValidationErrors
];

//get all spots
router.get('/', async (req, res) => {
    const spot = await Spot.findAll({
        group: ['Spot.id', 'SpotImages.url'],
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ],
                [
                    sequelize.col("SpotImages.url"),
                    "previewImage"
                ]
            ]
        },

        include: [
            {
                model: Review,
                attributes: [],
            },
            {
                model: SpotImage,
                attributes: []
            }
        ]
    })

    console.log(spot)

    return res.json({ spot })
});


// Get all Spots owned by the Current User

router.get('/current', async (req, res) => {
    const userId = req.user.id
    // console.log(userId)
    const cUser = await Spot.findAll({ where: { ownerId: userId } });
    return res.json(cUser);

});


// Get details of a Spot from an id
router.get('/:id', async (req, res) => {
    const spot = await Spot.findByPk(req.params.id, {
        group: ['Spot.id', 'SpotImages.url'],
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.col("Reviews.id")),
                    "numRevies"
                ],
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ],
            ]
        },

        include: [
            {
                model: Review,
                attributes: [],
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })
    if (!spot.id && spot.id === null) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" })
    }
    console.log(spot)

    return res.json({ spot })
})
//Create Spot

router.post('/', async (req, res) => {

     let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    
    if(!address || address === '') {
        errorResult.errors.push("Street address is required");
    }
    
    if(!city || city === '') {
        errorResult.errors.push("City is required");
    }
    
    if(!state || state === '') {
        errorResult.errors.push("State is required");
    }
    
    if(!country || country === '') {
        errorResult.errors.push("Country is required");
    }
    
    if(!lat || lat === '' || isNaN(lat)) {
        errorResult.errors.push("Latitude is required");
    }
    else if(lat < -90 || lat > 90) {
        errorResult.errors.push("Latitude is not valid");
    }
    
    if(!lng || lng === '' || isNaN(lng)) {
        errorResult.errors.push("Longitude is not valid");
    }
    else if(lng < -180 || lng > 180) {
        errorResult.errors.push("Longitude is not valid");
    }
    
    if(!name || name === '') {
        errorResult.errors.push("Longitude is not valid");
    }
    else if(name.length > 50) {
        errorResult.errors.push("Name must be less than 50 characters");
    }
    
    if(!description || description === '') {
        errorResult.errors.push("Description is required");
    }
    
    
    if(!price || price === '') {
        errorResult.errors.push("Price per day is required");
    }
    
    if(errorResult.errors.length) {
        res.status(400);
        res.json(errorResult);
        return;
    }
    
    const createSpot = await Spot.create({ address, city, state, country, lat, lng, name, description, price  });
    res.status(201)
    return res.json({ createSpot });
}
);


// ### Edit a Spot

router.put('/:id', async (req, res) => {
    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    const { id } = req.params;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const updateSpot = await Spot.findByPk(id);   
    if(!updateSpot){ // findByPk is differ from findOne, findAll
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return ;
    }
    


    if(address && address !== '') {
        updateSpot.address = address;
    }
    else {
        errorResult.errors.push("Street address is required");
    }

    if(city && city !== '') {
        updateSpot.city = city;
    }
    else {
        errorResult.errors.push("City is required");
    }

    if(state && state !== '') {
        updateSpot.state = state;
    }
    else {
        errorResult.errors.push("State is required");
    }

    if(country && country !== '') {
        updateSpot.country = country;
    }
    else {
        errorResult.errors.push("Country is required");
    }

    if(lat && lat !== '' && !isNaN(lat)) {
        if( lat >= -90 && lat <= 90) {
            updateSpot.lat = lat;
        }
        else {
            errorResult.errors.push("Latitude is not valid");
        }
    }
    else {
        errorResult.errors.push("Latitude is required");

    }

    if(lng && lng !== '' && !isNaN(lng)) {
        if(lng >= -180 && lng <= 180) {
            updateSpot.lng = lng;
        }
        else {
            errorResult.errors.push("Longitude is not valid");
        }
    }
    else{
        errorResult.errors.push("Longitude is required");      
    }

    if(name && name !== '') {
        if(name.length <= 50) {
            updateSpot.name = name;
        }
        else {
            errorResult.errors.push("Name must be less than 50 characters");
        }
    }

    if(description && description !== '') {
        updateSpot.description = description;
    }
    else {
        errorResult.errors.push("Description is required");
    }

    
    if(price && price !== '') {
        updateSpot.price = price;
    }
    else {
        errorResult.errors.push("Price per day is required");
    }

    if(errorResult.errors.length) {
        res.status(400);
        res.json(errorResult);
        return;
    }

    // await updateSpot.save();   // comment if for test only

    res.status(201);
    return res.json({updateSpot});
})




//Create an Image for a Spot
router.post('/:id/images', async (req, res) => {
    const { url, preview } = req.body;
    const newImage = await SpotImage.create({ url, preview });
    res.status(201)
    return res.json({ newImage });
})


//Create a Review for a Spot based on the Spot's id
router.post('/:id/reviews', async (req, res) => {
    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    let id = req.params.id;
    id = parseInt(id);

    console.log("spotId: ", id);

    const spotReview = await Review.findOne({
        where: { spotId: id }
    });

    if (!spot || !spot.id === null) {
        res.json({ message: "Spot couldn't be found" })
        res.status(404);
        return;
    }


    let uid = req.user.id;
    // uid = uid.parseInt(uid);

    // console.log("userId: ", userId);


    const userReview = await Review.findOne({
        where: { userId: uid }
    });

    if (!userReview && !userReview.id === null) {
        res.json({ message: "SUser already has a review for this spot" })
        res.status(403);
        return;
    }


    let { review, stars } = req.body;

    console.log("review: ", review);
    console.log("stars: ", stars);

    if (!review || review === '') {
        errorResult.errors.push("Review text is required");
        //errorResult.errors.push("Stars must be an integer from 1 to 5");
    }

    if (stars) {
        stars = parseInt(stars)
        if (Number.isInteger(stars) && stars > 0 && stars <= 5) {
        }
        else {
            //errorResult.errors.push("Review text is required");
            errorResult.errors.push("Stars must be an integer from 1 to 5");
        }
    }

    if (errorResult.errors.length) {
        res.status(400);
        res.json(errorResult);
        return;
    }

    const newReview = await Review.create({
        spotId: id,
        userId: uid,
        review: review,
        stars: stars
    })
    return res.json(newReview)
})




//Get Reviews by Spot Id
router.get('/:id/reviews', async (req, res) => {
    let id = req.params.id
    id = parseInt(id);
    console.log(typeof (id), id)
    const review = await Review.findAll({
        where: { spotId: id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']

            }
        ]
    });
    if (!review || review.length <= 0) {
        res.status(400)
        return res.json({ message: "Review couldn't be found" })
    }
    return res.json(review);

});



//Get all Bookings for a Spot based on the Spot's id
router.get('/:id/bookings', async (req, res) => {

    const bookings = await Booking.findAll({
        where: { spotId: req.params.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: Spot,
                attributes: ['ownerId'],
                include: [
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName']
                    }
                ]
            },

        ]
    });

    const result = bookings.map((booking) => {
        if (booking.Spot.ownerId !== req.user.id) {
            return {
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate
             
            }
        } else {
            return {
                User: booking.User, 
                id: booking.id,
                spotId: booking.spotId,
                userId: booking.userId,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            }
        }
    });
    return res.json({ Bookings: result });
  
});


//Create a Booking Based on a spotId


router.post('/:bookId/bookings', async (req, res) => {
    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    const { bookId } = req.params;

    const createBooking = await Booking.findByPk(bookId);   

    if(!createBooking){ 
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
            spotId : createBooking.spotId
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
 
    createBooking.startDate = startDay;
    createBooking.endDate = endDay;
    
    
    await createBooking.save();


    res.status(200);
    return res.json({ createBooking });

})


//Delete a Spot

router.delete('/:id', async (req, res, next) => {
    const spots = await Spot.findByPk(req.params.id);
    
    if (spots) {
        await spots.destroy();
        res.status(200)
         res.json({ message: 'Successfully deleted' });
    } else {
        res.status(404)
        res.json({ message: "Spot couldn't be found"
        })
    }
});


// router.get('/', async(req, res)=>{
//     // const { address, city, state, country, lat, lng, name, description, price, ownerId } = req.body;
//     const spot = await Spot.findAll({
//         attributes: [address, city, state, country, lat, lng, name, description, price, ownerId],
//         where
//      });

//     return res.json({spot})
// })

module.exports = router;
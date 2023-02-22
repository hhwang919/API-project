const express = require('express')
const router = express.Router();

const { Spot, User, sequelize, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const review = require('../../db/models/review');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const booking = require('../../db/models/booking');
const { requireAuth } = require('../../utils/auth');



// const validateSpot = [
//     check('address')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 3 })
//         .withMessage('Please enter valid address'),
//     handleValidationErrors
// ];


//get all spots
router.get('/', async (req, res, next) => {
    // let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    const err = new Error("Validation error");
    err.errors = [];


    let { page, size } = req.query;

    console.log(typeof page);
    console.log(typeof size);

    //page = Number(page);
    //size = Number(size);
    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page)) page = 0;
    if (Number.isNaN(size)) size = 20;

    console.log(page);
    console.log(size);

    //if (!isNaN(page)) page = 0;
    //if (!isNaN(size)) size = 20;
    if ( page > 10 ) page = 10;
    if ( size > 20 ) size = 20;

    if ( page < 0 ) {
        err.errors.push("Page must be greater than or equal to 0");
    }
    if ( size < 0 ) {
        err.errors.push("Size must be greater than or equal to 0");
    }

    if(err.errors.length) {
        err.status(400);
        err.title = "Vlidation error";
        return next(err)
    }


    console.log(typeof page);
    console.log(typeof size);

    let pagination = {};
    if(page > 0 && size > 0) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
        console.log("in ", pagination.limit, pagination.offset);

    }
 
    console.log(pagination.limit, pagination.offset);

    // const spots = await Spot.findAll({
    //     attributes: {
    //         include: [
    //             [sequelize.literal(`COALESCE((
    //                 SELECT AVG("stars")
    //                 FROM "Reviews"
    //                 WHERE "Reviews"."spotId" = "Spot"."id"
    //                 ), '0')`), 'avgRating'
    //             ],
    //             [sequelize.literal(`COALESCE((
    //                 SELECT url
    //                 FROM "SpotImages"
    //                 WHERE "SpotImages"."spotId" = "Spot"."id" 
    //                 AND "SpotImages"."preview" = true
    //                 ORDER BY "SpotImages"."id" ASC
    //                 LIMIT 1 
    //                 ), '')`), 'previewImage'
    //         ]
    //     ]
    // },
    //     ...pagination
    // });

    // const spot = await Spot.findAll({
    //     group: ['Spot.id', 'previewImage.id'],
    //     attributes: {
    //         include: [
    //             [
    //                 sequelize.fn("AVG", sequelize.col("Reviews.stars")),
    //                 "avgRating"
    //             ]
    //         ]
    //     },
    //     include: [
    //         {
    //             model: Review,
    //             attributes: [],
    //         },
    //         {
    //             as: 'previewImage',
    //             model: SpotImage,
    //             attributes: ['url']
    //         }
    //     ],
    //     pagination: pagination
    // })

    const spots = await Spot.findAll({
        order: [['id', 'ASC']],
        include: [
            {
                model: Review,
                attributes: ['stars'],
            },
            {
                as: 'previewImage',
                model: SpotImage,
                attributes: ['url', 'preview']
            }
        ],
        ...pagination
    })

    const results = spots.map((spot) => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat:spot.lat, //.toFixed(7),
        lng:spot.lng,  //.toFixed(7),
        name:spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: spot.Reviews.length > 0 ? spot.Reviews.reduce((total, current) => total + current.stars, 0) / spot.Reviews.length : null,
        previewImage: spot.previewImage.length > 0 ? spot.previewImage.filter(el => el.preview)[0]['url'] : ""
    }));
    

res.status(200)
    return res.json({ 
        Spots: results,
        page,
        size 
    });
});





// Get all Spots owned by the Current User

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id

    // console.log(userId)
    // const cUser = await Spot.findAll({ 
    //     where: { ownerId: userId },
    //     group: ['Spot.id', 'previewImage.id'],
    //     attributes: {
    //         include: [
    //             [
    //                 sequelize.fn("AVG", sequelize.col("Reviews.stars")),
    //                 "avgRating"
    //             ]
    //         ]
    //     },
    //     include: [
    //         {
    //             model: Review,
    //             attributes: [],
    //         },
    //         {
    //             as: 'previewImage',
    //             model: SpotImage,
    //             attributes: ['url'],
    //             where: {preview:true},
    //         }
    //     ]
    // })

    // const cUser = await Spot.findAll({ 
    //     where: { ownerId: userId },
    //     attributes: {
    //         include: [
    //             [sequelize.literal(`COALESCE((
    //                 SELECT AVG("stars")
    //                 FROM "Reviews"
    //                 WHERE "Reviews"."spotId" = "Spot"."id"
    //                 ), '0')`), 'avgRating'
    //             ],
    //             [sequelize.literal(`COALESCE((
    //                 SELECT url
    //                 FROM "SpotImages"
    //                 WHERE "SpotImages"."spotId" = "Spot"."id" 
    //                 AND "SpotImages"."preview" = true
    //                 ORDER BY "SpotImages"."id" ASC
    //                 LIMIT 1 
    //                 ), '')`), 'previewImage'
    //             ]
    //         ]
    //     },
    // });

    const cUser = await Spot.findAll({ 
        order: [['id', 'ASC']],
        where: { ownerId: userId },
        include: [
            {
                model: Review,
                attributes: ['stars'],
            },
            {
                as: 'previewImage',
                model: SpotImage,
                attributes: ['url', 'preview']
            }
        ],
    })

    const results = cUser.map((spot) => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat:spot.lat,
        lng:spot.lng,
        name:spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: spot.Reviews.length > 0 ? spot.Reviews.reduce((total, current) => total + current.stars, 0) / spot.Reviews.length : null,
        previewImage: spot.previewImage.length > 0 ? spot.previewImage.filter(el => el.preview)[0]['url'] : ""
    }));
        
    res.status(200);
    return res.json( { Spots: results } );

});



// Get details of a Spot from an id
router.get('/:id', async (req, res,next) => {
    const spot = await Spot.findByPk(req.params.id, {
        group: ['Spot.id', 'previewImage.id','Owner.id'],
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
                as: 'previewImage',
                model: SpotImage,
                attributes: ['url']
            },
            {
                as: 'Owner',
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })
    if (!spot && spot === null) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" })
    }
    console.log(spot)

    return res.json({ spot })
})
//Create a Spot

router.post('/', requireAuth, async (req, res, next) => {

    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const ownerId = req.user.id;

    if (!ownerId) {
        errorResult.errors.push(" Need to login to create a spot")
    }


    if (!address || address === '') {
        errorResult.errors.push("Street address is required");
    }

    if (!city || city === '') {
        errorResult.errors.push("City is required");
    }

    if (!state || state === '') {
        errorResult.errors.push("State is required");
    }

    if (!country || country === '') {
        errorResult.errors.push("Country is required");
    }

    if (!lat || lat === '' || isNaN(lat)) {
        errorResult.errors.push("Latitude is required");
    }
    else if (lat < -90 || lat > 90) {
        errorResult.errors.push("Latitude is not valid");
    }

    if (!lng || lng === '' || isNaN(lng)) {
        errorResult.errors.push("Longitude is not valid");
    }
    else if (lng < -180 || lng > 180) {
        errorResult.errors.push("Longitude is not valid");
    }

    if (!name || name === '') {
        errorResult.errors.push("Longitude is not valid");
    }
    else if (name.length > 50) {
        errorResult.errors.push("Name must be less than 50 characters");
    }

    if (!description || description === '') {
        errorResult.errors.push("Description is required");
    }


    if (!price || price === '') {
        errorResult.errors.push("Price per day is required");
    }

    if (errorResult.errors.length) {
        res.status(400);
        res.json(errorResult);
        return;
    }

    const createSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });
    res.status(201)
    return res.json(createSpot);
}
);


// ### Edit a Spot

router.put('/:id',requireAuth, async (req, res, next) => {
    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    const { id } = req.params;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;



    // Check spot exist and belong to current user
    const updateSpot = await Spot.findByPk(id);
    if (!updateSpot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return;
    }
    // Check spot belong to usert
    if (updateSpot.ownerId !== req.user.id) {
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
        res.status(403);
        return;
    }


    if (address && address !== '') {
        updateSpot.address = address;
    }
    else {
        errorResult.errors.push("Street address is required");
    }

    if (city && city !== '') {
        updateSpot.city = city;
    }
    else {
        errorResult.errors.push("City is required");
    }

    if (state && state !== '') {
        updateSpot.state = state;
    }
    else {
        errorResult.errors.push("State is required");
    }

    if (country && country !== '') {
        updateSpot.country = country;
    }
    else {
        errorResult.errors.push("Country is required");
    }

    if (lat && lat !== '' && !isNaN(lat)) {
        if (lat >= -90 && lat <= 90) {
            updateSpot.lat = lat;
        }
        else {
            errorResult.errors.push("Latitude is not valid");
        }
    }
    else {
        errorResult.errors.push("Latitude is required");

    }

    if (lng && lng !== '' && !isNaN(lng)) {
        if (lng >= -180 && lng <= 180) {
            updateSpot.lng = lng;
        }
        else {
            errorResult.errors.push("Longitude is not valid");
        }
    }
    else {
        errorResult.errors.push("Longitude is required");
    }

    if (name && name !== '') {
        if (name.length <= 50) {
            updateSpot.name = name;
        }
        else {
            errorResult.errors.push("Name must be less than 50 characters");
        }
    }

    if (description && description !== '') {
        updateSpot.description = description;
    }
    else {
        errorResult.errors.push("Description is required");
    }


    if (price && price !== '') {
        updateSpot.price = price;
    }
    else {
        errorResult.errors.push("Price per day is required");
    }

    if (errorResult.errors.length) {
        res.status(400);
        res.json(errorResult);
        return;
    }

    await updateSpot.save();

    res.status(201);
    return res.json(updateSpot);
})




//Create an Image for a Spot
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };
    const { spotId } = req.params;

    const updateSpot = await Spot.findByPk(spotId);

    // Check spot exist
    if (!updateSpot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return;
    }

    // Check spot belong to user
    if (updateSpot.ownerId !== req.user.id) {
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
        res.status(403);
        return;
    }

    // Check spot exist and belong to current user
    const spot = await Spot.findOne({
        where: {
            id: spotId,
            ownerId: req.user.id
        }
    });

    if (!spot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return;
    }

    const { url, preview } = req.body;

    if (!url || url === '') {
        errorResult.errors.push("url is required");
    }

    if (!preview || preview === '') {
        errorResult.errors.push("preview is required");
    }

    if (errorResult.errors.length) {
        res.status(400);
        res.json(errorResult);
        return;
    }

    console.log(url, preview)
    const newImage = await SpotImage.create({ url, preview, spotId });

    res.status(200)
    return res.json(newImage);
})


//Create a Review for a Spot based on the Spot's id
router.post('/:id/reviews', requireAuth, async (req, res, next) => {
    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    const userId = req.user.id;
    const spotId = req.params.id;

    console.log({ userId, spotId });

    const spot = await Spot.findByPk(spotId)

    //f (!spot || !spot.id === null) {
    if (!spot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return;
    }



    // User already has a review for this spot
    const userReview = await Review.findOne({
        where: {
            spotId: spotId,
            userId: userId
        }
    });

    if (userReview) {
        res.json({ message: "User already has a review for this spot" })
        res.status(403);
        return;
    }


    let { review, stars } = req.body;

    console.log("review: ", review);
    console.log("stars: ", stars);

    if (!review || review === '') {
        errorResult.errors.push("Review text is required");
    }

    if (stars === 0) stars = -1;    
    if (stars) {
        //stars = parseInt(stars)
        if (!isNaN(stars) && stars >= 1 && stars <= 5) {
        }
        else {
            errorResult.errors.push("Stars must be an integer from 1 to 5");
        }
    }
    else {
        errorResult.errors.push("stars is required");
    }

    if (errorResult.errors.length) {
        res.status(400);
        res.json(errorResult);
        return;
    }

    const newReview = await Review.create({
        spotId: spotId,
        userId: userId,
        review: review,
        stars: stars
    })
    return res.json(newReview)
})




//Get Reviews by Spot Id
router.get('/:id/reviews', async (req, res, next) => {
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
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return;
    }
    return res.json({ Reviews: review });

});



//Get all Bookings for a Spot based on the Spot's id
router.get('/:id/bookings',requireAuth, async (req, res, next) => {

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
                        as: 'Owner',
                        model: User,
                        attributes: ['id', 'firstName', 'lastName']
                    }
                ]
            },

        ]
    });
    if (!bookings || bookings.length <= 0) {
        res.json({
            message: "Spot Couldn't be found",
            statusCode: 404
        });
        res.status(404);
        return;
    }

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


// ### Create a Booking from a Spot based on the Spot's id

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    let errorResult = { message: "Validation error", statusCode: 400, errors: [] };

    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return;
    }

    let newStartDay;
    let newEndDay;

    let { startDate, endDate } = req.body;


    console.log("startDate: ", startDate);
    console.log("endDate: ", endDate);

    if (startDate && startDate !== '') {
        newStartDay = new Date(startDate);
    }
    else {
        errorResult.errors.push("Start Date is required");
    }

    if (endDate && endDate !== '') {
        newEndDay = new Date(endDate);
    }
    else {
        errorResult.errors.push("End Date is required");
    }

    if (newStartDay >= newEndDay) {
        errorResult.errors.push("endDate cannot be on or before startDate");
    }

    let now = new Date();

    if (newStartDay < now || newEndDay < now) {
        res.json({
            message: "Past bookings isn't allowed",
            statusCode: 403
        })
        res.status(403);
        return;
    }

    if (errorResult.errors.length) {
        errorResult.message = "Validation error";
        errorResult.statusCode = 400;
        res.status(400);
        res.json(errorResult);
        return;
    }


    // Check Conflict
    const bookingBySpot = await Booking.findAll({
        where: {
            spotId: spotId
        },
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate']
    })

    console.log(bookingBySpot);

    for (const obj of bookingBySpot) {
        console.log("obj: ", obj.startDate, obj.endDate);

        let bookedStartDay = new Date(obj.startDate);
        let bookedEndDay = new Date(obj.endDate);
        console.log("occupid start day: ", bookedStartDay)
        console.log("occupid end day: ", bookedEndDay)

        if (newStartDay >= bookedStartDay && newEndDay <= bookedEndDay) {
            errorResult.errors.push("Start date conflicts with an existing booking");
            errorResult.errors.push("End date conflicts with an existing booking");
            break;
        }
        else if (newStartDay <= bookedStartDay && newEndDay >= bookedEndDay) {
            errorResult.errors.push("Start date conflicts with an existing booking");
            errorResult.errors.push("End date conflicts with an existing booking");
            break
        }
        else if (newStartDay >= bookedStartDay && newStartDay <= bookedEndDay) {
            errorResult.errors.push("Start date conflicts with an existing booking");
            break;
        }
        else if (newEndDay >= bookedStartDay && newEndDay <= bookedEndDay) {
            errorResult.errors.push("End date conflicts with an existing booking");
            break;
        }
    }

    if (errorResult.errors.length) {
        errorResult.message = "Sorry, this spot is already booked for the specified dates";
        errorResult.statusCode = 403;
        res.status(403);
        res.json(errorResult);
        return;
    }

    console.log(spotId, req.user.id, startDate, endDate)

    const createBooking = await Booking.create({
        spotId: spotId,
        userId: req.user.id,
        startDate: startDate,
        endDate: endDate
    });


    res.status(200);
    return res.json(createBooking);

})


  //Delete a Spot
   
   router.delete('/:id', requireAuth, async (req, res, next) => {
  
    const deleteSpot = await Spot.findByPk(req.params.id);
    if (!deleteSpot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
        res.status(404);
        return;
    }
    // Check spot belong to user
    if (deleteSpot.ownerId !== req.user.id) {
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
        res.status(403);
        return;
    }

    if (deleteSpot) {
        await deleteSpot.destroy();
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
        res.status(200);
        return;
    } 
    else {
        res.json({
            message: "Spots Couldn't be found",
            statusCode: 404
        });
        res.status(404);
        return;
    }
});


module.exports = router;
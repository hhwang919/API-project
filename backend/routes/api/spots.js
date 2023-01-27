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
        group: ['Spot.id'],
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

router.post('/', validateSpot, async (req, res) => {

    const { address, city, state, country, lat, lng, name } = req.body;
    const createSpot = await Spot.create({ address, city, state, country, lat, lng, name });

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
    if(address) {
        updateSpot.address = address;
    }
    else {
        errorResult.errors.push("Street address is required");
    }

    if(city) {
        updateSpot.city = city;
    }
    else {
        errorResult.errors.push("City is required");
    }

    if(state) {
        updateSpot.state = state;
    }
    else {
        errorResult.errors.push("State is required");
    }

    if(country) {
        updateSpot.country = country;
    }
    else {
        errorResult.errors.push("Country is required");
    }

    if(lat) {
        if( lat >= -90 && lat <= 90) {
            updateSpot.lat = lat;
        }
        else {
            errorResult.errors.push("Latitude is not valid");
        }
    }
    if(lng) {
        if(lng >= -180 && lng <= 180) {
            updateSpot.lng = lng;
        }
        else {
            errorResult.errors.push("Longitude is not valid");
        }
    }

    if(name) {
        if(name.length <= 50) {
            updateSpot.name = name;
        }
        else {
            errorResult.errors.push("Name must be less than 50 characters");
        }
    }
    
    if(price) {
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

    await updateSpot.save();   // comment if for test only

    res.json({
        message: `Successfully upgrade spot with id ${id}.`,
        Spot: updateSpot
    });
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
                userId: booking.userId
            }
        }
    });
    return res.json({ Bookings: result });
  
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
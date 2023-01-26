const express = require('express')
const router = express.Router();

const { Spot, User, sequelize, SpotImage, Review } = require('../../db/models');
const review = require('../../db/models/review');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



const validateSpot = [
    check('address')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Please enter valid address'),
    handleValidationErrors
];

//get all spots
router.get('/', async(req, res) => {
    const spot = await Spot.findAll ({
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
    
    return res.json({spot})
});


// Get all Spots owned by the Current User

router.get('/current',  async(req, res)=>{
    const userId = req.user.id
    // console.log(userId)
    const cUser  = await Spot.findAll({where:{ownerId:userId}});
    return res.json(cUser);

});


// Get details of a Spot from an id
router.get('/:id',  async (req, res) => {
    const spot  = await Spot.findByPk(req.params.id, {
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
if(!spot.id && spot.id === null){
    res.status(404);
    return res.json({message:"Spot couldn't be found"})
}
    console.log(spot)
    
    return res.json({spot})
})
//Create Spot

router.post( '/',validateSpot,
    async (req, res) => {
        const { address, city, state, country, lat, lng, name  } = req.body;
        const ownerId = req.user.id
      const createSpot = await Spot.create({ address, city, state, country, lat, lng, name  });

      res.status(201)
      return res.json({createSpot});
    }
  );



// router.get('/', async(req, res)=>{
//     // const { address, city, state, country, lat, lng, name, description, price, ownerId } = req.body;
//     const spot = await Spot.findAll({
//         attributes: [address, city, state, country, lat, lng, name, description, price, ownerId],
//         where
//      });

//     return res.json({spot})
// })

module.exports = router;
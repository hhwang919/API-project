const express = require('express')
const router = express.Router();

const { Spot, User } = require('../../db/models');



//get all spots
router.get('/', async(req, res)=>{
    const spot = await Spot.findAll();
    console.log(spot)
    return res.json({spot})
})

//Get all Spots owned by the Current User

router.get('/current',  async(req, res)=>{
    const userId = req.user.id;
    const cUser  = await Spot.findByPk(userId);
return     res.json(cUser);

})


//

router.get('/:id',  async(req, res)=>{
    const {userId} = req.user.id;
    const cUser  = await Spot.findByPk(userId);
return     res.json(cUser);

})



// router.get('/', async(req, res)=>{
//     // const { address, city, state, country, lat, lng, name, description, price, ownerId } = req.body;
//     const spot = await Spot.findAll({
//         attributes: [address, city, state, country, lat, lng, name, description, price, ownerId],
//         where
//      });

//     return res.json({spot})
// })

module.exports = router;
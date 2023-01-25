const express = require('express')
const router = express.Router();

const { Spot, User } = require('../../db/models');




router.get('/', async(req, res)=>{
    const spot = await Spot.findAll();
    console.log(spot)
    return res.json({spot})
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
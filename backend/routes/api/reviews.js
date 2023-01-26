const express = require('express')
const router = express.Router();

const { Spot, User, sequelize, SpotImage, Review } = require('../../db/models');
const review = require('../../db/models/review');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//Get All reviews

router.get('/', async(req, res)=>{
    const review = await Review.findAll();
    return res.json(review)
})


//Get all reviews by current user 
router.get('/current',  async(req, res)=>{
    const userId = req.user.id
    // console.log(userId)
    const cUser  = await Review.findAll({where:{userId:userId}});
    return res.json(cUser);

});



module.exports = router;
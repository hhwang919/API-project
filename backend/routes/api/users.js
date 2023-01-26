const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('need to enter first name'),
        check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('need to enter last name'),
    handleValidationErrors
  ];


// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      const user = await User.signup({ email, username, password, firstName, lastName });
  
      await setTokenCookie(res, user);
  
      return res.json({
        user: user
      });
    }
  );

//Get Current User

// router.get(
//   '/',
//   (req, res) => {
//     const { user } = req;
//     if (user) {
//       return res.json({
//         user: user.toSafeObject()
//       });
//     } else 
//     return res.json({ user: null });
//   }
// );

// router.get('/',  async(req, res)=>{
//   const userId = req.user.id;
//   const user  = await User.findByPk(userId);
// return     res.json(user);
// })


module.exports = router;
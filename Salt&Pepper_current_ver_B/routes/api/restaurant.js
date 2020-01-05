const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const jwt = require('njwt');
const config = require('config');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const Restaurant = require('../../models/Restaurant');
var nodemailer = require('nodemailer');
const Resrecipe = require('../../models/Resrecipe')

const { check, validationResult } = require('express-validator/check');

// router.get('/', auth, async (req, res) => {
//   try {
//     const user = await Restaurant.findById(req.user.id).select('-password');
//     res.send(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

router.post(
  '/',
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'enter correct email').isEmail(),
    check('password', 'minimum length of password is 6 characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, locality, city, pincode } = req.body;
    try {
      let user = await Restaurant.findOne({ email }); //email: req.body.email

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user with email already exists' }] });
      }

      const payload = {
        name: req.body.name,
        email: req.body.email
      };
      const token = jwt.create(payload, config.get('jwtSecret'));
      token.setExpiration(new Date().getTime() + 86000 * 100000)
      user = new Restaurant({
        name,
        email,
        password,
        locality,
        city,
        pincode,
        token
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.json(user);

      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
          user: 'saltandpepper1218@gmail.com',
          pass: 'yuvraj12'
        }
      });

      var mailOptions = {
        from: 'saltandpepper1218@gmail.com',
        to: user.email,
        subject: 'Find Your API Token',
        text:
          'Dear ' + req.body.name + '\n' + 'Please find your token: ' + token
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

router.post('/upload/:token', async (req, res) => {
  console.log(req.params)
  const token = req.params.token
  const recipe = req.body.recipe
  console.log(req.body)
  jwt.verify(token, config.get('jwtSecret'), async (err, verifiedJwt) => {
    if (err) {
      res.send(err.message)
    } else {
      var email = verifiedJwt.body.email
      let user = await Restaurant.findOne({ email })
      if (user) {
        const {
          title,
          description,
          cuisine,
          images
        } = req.body.recipe;
        const recipedetails = new Resrecipe({
          title,
          description,
          cuisine,
          images,
          user
        });
        recipedetails.save()
        json = {
          message: "Recipe Uploaded Successfully",
          Recipe: recipedetails
        }
        res.json(json)

      }
      else {
        res.send("User Not Found")
      }
      // const {
      //   title,
      //   description,
      //   cuisine,
      // } = req.body;
      // const user = await Restaurant.findOne(token=req.body.token)
      // const recipedetails = {
      //   title,
      //   description,
      //   cuisine,
      // };

    }
  })
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Nutritionist = require('../../models/Nutritionist');
const jwt = require('njwt');
const config = require('config');
var nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

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
    const { name, email, password } = req.body;
    try {
      let user = await Nutritionist.findOne({ email }); //email: req.body.email

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
      token.setExpiration(new Date().getTime() + 86000 * 10000);
      user = new Nutritionist({
        name,
        email,
        password,
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
          'Dear ' +
          req.body.name +
          ',' +
          '\n\n' +
          'Please find your token: ' +
          token
      };

      transporter.sendMail(mailOptions, function(error, info) {
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
router.post('/diet/:token', async (req, res) => {
  const token = req.params.token;
  const diet = req.body.diet;
  const mincal = req.body.mincal;
  const maxcal = req.body.maxcal;
  jwt.verify(token, config.get('jwtSecret'), async (err, verifiedJwt) => {
    if (err) {
      res.send(err.message);
    } else {
      var email = verifiedJwt.body.email;
      let user = await Nutritionist.findOne({ email });
      if (user) {
        const recipes = await Recipe.find({
          diet: diet,
          calories: { $gt: mincal, $lt: maxcal }
        });
        res.json(recipes);
        console.log(recipes);
      } else {
        res.send('User Not Found');
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
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('njwt');
const config = require('config');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const Warehouse = require('../../models/Warehouse');
var nodemailer = require('nodemailer');

const { check, validationResult } = require('express-validator/check');
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

    const { name, email, password, locality, pincode, city } = req.body;
    try {
      let user = await Warehouse.findOne({ email }); //email: req.body.email

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
      user = new Warehouse({
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

module.exports = router;

const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator/check');

//@route POST api/users
//@access public
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
      let user = await User.findOne({ email }); //email: req.body.email

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user with email already exists' }] });
      }

      const avatar = gravatar.url(email, {
        d: 'mm',
        s: '200',
        r: 'pg'
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      profile = new Profile({ user});
      await profile.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;

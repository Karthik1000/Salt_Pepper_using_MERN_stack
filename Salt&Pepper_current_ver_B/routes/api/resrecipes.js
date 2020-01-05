const express = require('express');
const router = express.Router();
const ResRecipe = require('../../models/Resrecipe');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const cloudinary = require('cloudinary');

router.get('/', auth, async (req, res) => {
  try {
    const recipes = await ResRecipe.find()
      .sort({ date: -1 })
      .populate('user', ['id', 'name', 'email']);
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

module.exports = router;

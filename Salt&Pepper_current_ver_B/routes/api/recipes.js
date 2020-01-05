const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'saltandpeppercloud',
  api_key: '291595787748935',
  api_secret: 'P8nXfLmLbJuhdTljN9MmY0lNLLs'
});

var multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');
var parser = multer({
  storage: cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'uploads',
    filename: function(req, file, cb) {
      cb(undefined, file.originalname);
    }
  })
});

//@route POST create recipe api/recipes
//@access private
router.post(
  '/',
  [
    // parser.array('images'),
    auth,
    [
      check('title', 'Recipe need a title')
        .not()
        .isEmpty(),
      check('cuisine', 'Recipe need a cuisine')
        .not()
        .isEmpty()
    ]
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);
    const {
      title,
      description,
      images,
      video,
      ingredients,
      ingredient,
      quantity,
      cuisine,
      diet,
      calories,
      report
    } = req.body;

    // console.log(images);

    // console.log(req.body);
    // var base64ToImage = require('base64-to-image');
    // var base64Str = req.body.images[1];
    // var path = './';
    // var optionalObj = { fileName: 'image', type: 'png' };

    // base64ToImage(base64Str, path, optionalObj);
    // console.log('done');
    // ingred = ingredient.map(function(e) {
    //   const ing = await Ingredient.findOne({title:e})._id;
    //   return ing
    // });
    // res.json(ingred)

    // req.files will show you the uploaded files
    // and req.body will show you the rest of your form data
    // console.log('url', images[1].url);
    // console.log(req.files[1].url);
    // res.json({ msg: 'done' });
    // var CryptoJS = require("crypto-js"); //replace thie with script tag in browser env

    // //encrypt
    // var rawStr = req.files[0].url;
    // var wordArray = CryptoJS.enc.Utf8.parse(rawStr);
    // var base64 = CryptoJS.enc.Base64.stringify(wordArray);
    // console.log("encrypted:", base64);

    // //decrypt
    // var parsedWordArray = CryptoJS.enc.Base64.parse(base64);
    // console.log(parsedWordArray);
    // var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
    // console.log("parsed:", parsedStr);

    try {
      const user = await User.findById(req.user.id).select('-password');
      const recipedetails = {
        title,
        description,
        ingredients,
        ingredient,
        quantity,
        cuisine,
        report,
        video,
        images,
        diet,
        calories,
        name: user.name,
        user: req.user.id,
        avatar: user.avatar
      };
      recipe = new Recipe(recipedetails);
      // console.log(user.fav_cuisines);
      // console.log(images);

      await recipe.save();
      console.log(recipe);
      const profile = await Profile.findOne({ user: req.user.id });
      profile.recipes.push(recipe);
      await profile.save();
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'server error' });
    }
  }
);

//@route GET all recipes api/recipes
//@access private
router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .sort({ date: -1 })
      .populate('user', ['id', 'name', 'avatar', 'email', 'fav_cuisines']);
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

//@route GET recipe by id api/recipes/:id
//@access private

router.get('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: 'recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'post not found' });
    }
    res.status(500).json({ msg: 'server error' });
  }
});

//@route DELETE recipe by id api/recipes/:id
//@access private

router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: 'recipe not found' });
    }

    if (recipe.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'not authorized' });
    }
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.recipes
      .map(recipe => recipe.id.toString())
      .indexOf(recipe.id);

    profile.recipes.splice(removeIndex, 1);

    await profile.save();

    await recipe.remove();
    res.json({ msg: 'recipe deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'post not found' });
    }
    res.status(500).json({ msg: 'server error' });
  }
});
//@route GET recipe by user_id api/recipes/recipe/user_id
//@access private

router.get('/recipe/:userprofile_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userrecipe = await Recipe.find({ user: user.id });

    console.log(userrecipe);
    if (!userrecipe) {
      return res.status(404).json({ msg: 'recipes not found' });
    }
    res.json(userrecipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

router.get('/recipe/others/:userprofile_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    const userrecipe = await Recipe.find({ user: user.id });

    console.log(userrecipe);
    if (!userrecipe) {
      return res.status(404).json({ msg: 'recipes not found' });
    }
    res.json(userrecipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

module.exports = router;

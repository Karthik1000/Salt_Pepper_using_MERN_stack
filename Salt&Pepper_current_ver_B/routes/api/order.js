const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');

router.post('/', auth, async (req, res) => {
  const title = req.body.recipe;
  //   console.log('***************');
  //   console.log(title);
  //   console.log('***************');
  let recipe = await Recipe.findOne({ title });
  console.log(recipe);
  const ingredients = recipe.ingredient;
  console.log(ingredients);
  ingredients.forEach(async ingredient => {
    let ingr = await Ingredient.findOne({ title: ingredient });
    console.log('***************');
    console.log(ingr);
    const quan = ingr.totalQuantity;
    console.log(quan);
    let ing = await Ingredient.findOneAndUpdate(
      { title: ingredient },
      { totalQuantity: quan - 1 },
      { new: true }
    );
    ing.save();
  });
  let profile = await Profile.findOne({ user: req.user.id });
  var orders = profile.orders;
  orders.push(req.body);
  var id_title = recipe.id;
  //   var id_title = await Recipe.findOne({ title: title });
  var cart = profile.cart;
  cart.splice(cart.indexOf(id_title), 1);
  let prof = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { orders: orders, cart: cart },
    { new: true }
  );
  prof.save();
  res.json(prof);
  console.log(prof);
});

module.exports = router;

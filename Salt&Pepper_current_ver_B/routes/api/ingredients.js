const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Ingredient = require('../../models/Ingredient');
const auth = require('../../middleware/auth');
const jwt = require('njwt');
const config = require('config');

//@route POST create ingredients api/ingredients
//@access private

router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const ingredientdetails = {
      title
    };
    const ingredient = new Ingredient(ingredientdetails);
    await ingredient.save();
    res.json(ingredient);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

router.post('/update', async (req, res) => {
  const title = req.body.title;
  const token = req.body.token;
  const quantity = req.body.quantity;

  jwt.verify(token, config.get('jwtSecret'), async (err, verifiedJwt) => {
    if (err) {
      console.error(err);
    } else {
      const name = verifiedJwt.body.name;
      let warehouse = await Warehouse.findOne({ name });
      const ware_id = warehouse.id;
      let ingredient = await Ingredient.findOne({ title });
      const availableQuantity = ingredient.availableQuantity;
      var flag = 0;
      var sum = Number(quantity);
      availableQuantity.forEach(ware => {
        console.log(ware_id, ware.user);
        if (ware.user == ware_id) {
          flag = 1;
          ware.quantity = quantity;
          sum = sum - quantity;
        }
        sum = sum + ware.quantity;
      });
      if (flag == 0) {
        availableQuantity.push({
          quantity: quantity,
          user: ware_id
        });
      }
      const totalQuantity = sum;
      console.log(availableQuantity);
      let ing = await Ingredient.findOneAndUpdate(
        { title },
        {
          availableQuantity: availableQuantity,
          totalQuantity: totalQuantity
        },
        {
          new: true
        }
      );
      ing.save();
      resp = {
        message: 'Ingredient Stock Updated Successfully',
        ing: ing
      };
      res.json(resp);
    }
  });
});
module.exports = router;

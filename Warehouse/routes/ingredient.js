const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');
const request = require('request');

router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ingredient = await Ingredient.findOne({
      _id: req.params.id
    });

    if (!ingredient) {
      res.status(400).json({ msg: 'ingredient not found' });
    }
    res.json(ingredient);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      res.status(400).json({ msg: 'ingredient not found' });
    }
    res.status(500).json({ msg: 'server error' });
  }
});

router.post('/create', async (req, res) => {
  const { title, minQuantity, availableQuantity } = req.body;

  const ingredient = new Ingredient({
    title,
    minQuantity,
    availableQuantity
  });
  ingredient.save();
  res.json(ingredient);
});

router.post('/update', async (req, res) => {
  const token = req.body.token;
  const title = req.body.title;
  const quantity = req.body.quantity;

  // console.log(token);
  // console.log(title);
  // console.log(quantity);

  let ingredient = await Ingredient.findOneAndUpdate(
    { title },
    { availableQuantity: quantity },
    { new: true }
  );
  ingredient.save();

  request.post(
    'http://localhost:5000/api/ingredients/update/',
    {
      json: {
        token: token,
        title: title,
        quantity: quantity
      }
    },
    (error, resp, body) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(body);
      res.json(body);
    }
  );
});

module.exports = router;

const express = require('express');
const router = express.Router();
const request = require('request');
router.post('/', async (req, res) => {
  const token = req.body.token;
  const recipe = req.body.recipe;
  console.log(recipe);
  request.post(
    'http://localhost:5000/api/restaurant/upload/' + token,
    {
      json: {
        token: token,
        recipe: recipe
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

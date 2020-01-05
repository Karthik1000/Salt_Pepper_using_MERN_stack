const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/', async (req, res) => {
  const token = req.body.token;
  const diet = req.body.diet;
  const mincal = req.body.mincal;
  const maxcal = req.body.maxcal;
  request.post(
    'http://localhost:5000/api/nutrition/diet/' + token,
    {
      json: {
        token: token,
        diet: diet,
        mincal: mincal,
        maxcal: maxcal
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

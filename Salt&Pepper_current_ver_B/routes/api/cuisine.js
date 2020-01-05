const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Cuisine = require('../../models/Cuisine');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// router.post(
//   "/",
//   [
//     auth,
//     [
//       check("title", "Posts need a title")
//         .not()
//         .isEmpty(),
//       check("content", "Posts need content")
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors: errors.array() });
//     }
//     const { title, content } = req.body;

//     try {
//       const user = await User.findById(req.user.id).select("-password");
//       const postdetails = {
//         title,
//         content,
//         name: user.name,
//         user: req.user.id,
//         avatar: user.avatar
//       };
//       const post = new Post(postdetails);
//       await post.save();
//       res.json(post);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ msg: "server error" });
//     }
//   }
// );

//@route GET all posts api/posts/
//@access private

router.post('/', auth, async (req, res) => {
  try {
    var user = req.body.user_id._id;
    const usr = await User.findById(user);
    // // const cuisine = new Cuisine({ title: 'South Indian' });
    // // await cuisine.save();
    // res.json(req.body);
    // console.log(req.body.user_id._id);
    usr.fav_cuisines = req.body.selected;
    usr.save();
    console.log(user);
    console.log(usr);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const cuisine = await Cuisine.find();
    // console.log(cuisine)
    res.json(cuisine);
  } catch (err) {
    console.error(err.message);
    // if (err.kind == "ObjectId") {
    //   return res.status(400).json({ msg: "post not found" });
    // }
    // res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;

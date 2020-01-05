const express = require('express');

// const connectDB = require('./config/db');

const app = express();

const bodyParser = require('body-parser');
const { resolve } = require('path');
// const cloudinary = require('cloudinary');

// cloudinary.config({
//   cloud_name: 'saltandpeppercloud',
//   api_key: '291595787748935',
//   api_secret: 'P8nXfLmLbJuhdTljN9MmY0lNLLs'
// });

//connect MongoDB
// connectDB();

app.get('/', (req, res) => res.send('API running'));

//Middleware for access to req.body

app
  .use(express.json({ extend: false }))
  .use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/nutrition', require('./routes/nutritionist'));

const PORT = process.env.PORT || 6000; //heroku runs star script in package.json file. The PORT variable in env is also for heroku

app.listen(PORT, () => console.log(`server started at ${PORT}`));

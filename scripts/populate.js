// scripts/populate.js
require('dotenv').config();
const mongoose = require('mongoose');
const House = require('../models/House');

const houseData = [];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => House.insertMany(houseData))
  .then(() => {
    console.log('Data successfully loaded!');
    process.exit();
  })
  .catch(err => {
    console.error('Failed to load data', err);
    process.exit(1);
  });

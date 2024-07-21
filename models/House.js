// models/House.js
const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  location: String,
  status: String,
  price: Number,
  size: Number,
  description: String,
  numberOfBeds: Number,
  images_url: [
    {
      url: String,
      filename: String,
    },
  ],
  date_created: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const House = mongoose.model('House', houseSchema);

module.exports = House;

// models/House.js
const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  location: String,
  status: String,
  price: Number,
  size: Number,
  description: String,
  image: String,
  link: String,
  numberOfBeds: Number,
  images: [String]
});

const House = mongoose.model('House', houseSchema);

module.exports = House;

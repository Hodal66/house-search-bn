const mongoose = require("mongoose");
const myHouseSchema = new mongoose.Schema({
  location: String,
  description: String,
});

module.exports = mongoose.model("MyHouse", myHouseSchema);

const mongoose = require("mongoose");
const myHouseSchema = new mongoose.Schema({
  location: String,
  description: String,
  price:Number,
  size:Number,
  numberOfBeds:Number,
  status:String,
  image_cover:[
    {
      url: String,
      filename: String,
    },
  ],
  images_url: [
    {
      url: String,
      filename: String,
    },
  ],
});

module.exports = mongoose.model("MyHouse", myHouseSchema);

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
  user_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  request_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
});

module.exports = mongoose.model("MyHouse", myHouseSchema);

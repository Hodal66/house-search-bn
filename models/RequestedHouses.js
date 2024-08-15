const mongoose = require("mongoose");
const myRequestedHouseSchema = new mongoose.Schema({
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
  clientInfo:[{
    fullName:String,
    email:String,
    message:String,
  }],
});

module.exports = mongoose.model("RequestedHouse", myRequestedHouseSchema);

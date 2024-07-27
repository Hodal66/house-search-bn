const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  houses:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"MyHouse",
  },
});

module.exports = mongoose.model("User", userSchema);

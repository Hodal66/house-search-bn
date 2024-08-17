const mongoose = require("mongoose");

const userRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

house_id: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "MyHouse",
  }],

  user_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }]
});

module.exports = mongoose.model("UserRequest", userRequestSchema);

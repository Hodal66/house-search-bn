const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);

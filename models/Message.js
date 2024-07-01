// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

  fullName:String,
  email:String,
  description:String,
  createdAt:Date,

});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

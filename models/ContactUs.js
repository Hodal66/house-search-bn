const mongoose = require("mongoose");
const contactUsSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("ContactUs", contactUsSchema);

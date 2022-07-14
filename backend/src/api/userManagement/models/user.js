const mongoose = require("mongoose");


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    status: {
      type: String, 
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    confirmationCode: { 
      type: String, 
      unique: true },
    role:String,
    resetpasswordOTP: { 
      type: String}
  })
);

module.exports = User;
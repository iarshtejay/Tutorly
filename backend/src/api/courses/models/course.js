const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  name: String,
  type: String,
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  tutor: {
    type: mongoose.Schema.ObjectId,
    ref: "Tutor",
  },
  students: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Student",
    },
  ],
});

module.exports = mongoose.model("Course", Course);
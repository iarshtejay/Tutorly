const mongoose = require('mongoose');

const Course = new mongoose.Schema({
    id: String,
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
    tutors: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Tutor',
        },
    ],
    students: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Student',
        },
    ]
});

module.exports = mongoose.model('Course', Course);
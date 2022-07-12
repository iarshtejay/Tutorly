const mongoose = require('mongoose');

const Tutor = new mongoose.Schema({
    id: String,
    name: String,
    courses: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Course",
        },
    ],
});

module.exports = mongoose.model('Tutor', Tutor);
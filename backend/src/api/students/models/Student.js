const mongoose = require('mongoose');

const Student = new mongoose.Schema({
    id: String,
    name: String,
    courses: [{
        _id: {
            type: mongoose.Schema.ObjectId,
            ref: "Course",
        },
        progress: {
            type: mongoose.Types.Decimal128
        },
        archived: Boolean
    }]
});

module.exports = mongoose.model('Student', Student);
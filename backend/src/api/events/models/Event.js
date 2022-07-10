const mongoose = require('mongoose');

const Event = new mongoose.Schema({
    name: String,
    desc: String,
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Event', Event);
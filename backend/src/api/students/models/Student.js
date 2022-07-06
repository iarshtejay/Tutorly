const mongoose = require('mongoose');

const Student = new mongoose.Schema({
    id: String,
    name: String
});

module.exports = mongoose.model('Student', Student);
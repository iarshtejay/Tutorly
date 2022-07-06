const mongoose = require('mongoose');

const Tutor = new mongoose.Schema({
    id: String,
    name: String
});

module.exports = mongoose.model('Tutor', Tutor);
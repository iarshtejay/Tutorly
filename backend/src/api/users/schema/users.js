const mongoose = require("mongoose");

const model = new mongoose.Schema({
    id: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    status: String,
    roles: String,
    confirmationCode: String
});

module.exports = mongoose.model("users", model);

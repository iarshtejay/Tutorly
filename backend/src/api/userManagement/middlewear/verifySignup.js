const db = require("../models/user");

exports.checkDuplicateEmail = (req, res) => {
    const email=db.find({email: req.body.email});
    return email;
};
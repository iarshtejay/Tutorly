const mongoose = require("mongoose");

const model = new mongoose.Schema({
    id: String,
    status: {
        type: Boolean,
        default: Date.now,
    },
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "users",
        },
    ],
    audit: {
        created_on: {
            type: Date,
            default: Date.now,
        },
        updated_on: {
            type: Date,
            default: Date.now,
        },
    },
});

module.exports = mongoose.model("conversation", model);

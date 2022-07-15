const mongoose = require("mongoose");

const model = new mongoose.Schema({
    id: String,
    message: String,
    conversation_id:  {
        type: mongoose.Schema.ObjectId,
        ref: "conversations",
    },
    sender_user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    receiver_user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        default: "SENT",
    },
    audit: {
        created_on: {
            type: Date,
            default: Date.now,
        },
    }
});

module.exports = mongoose.model("message", model);

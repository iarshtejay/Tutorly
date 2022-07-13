const mongoose = require("mongoose");

const Assignment = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    title: { type: String, required: true },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    description: { type: String, required: true },
    attachments: { type: Array },
});

module.exports = mongoose.model("Assignment", Assignment);

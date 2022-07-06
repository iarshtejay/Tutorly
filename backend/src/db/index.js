const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 100000,
    connectTimeoutMS: 100000,
});

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Database connected");
});

db.on("error", (err) => {
    console.error("Database connection failed with error: %s", err);
});

db.on("disconnected", () => {
    console.log("Database connection disconnected");
});


module.exports = db;

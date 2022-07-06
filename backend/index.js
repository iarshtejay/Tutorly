require('dotenv-flow').config();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const session = require('express-session');
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log("ped", process.env.DATABASE_URI);

const store = new MongoDBStore({
    uri: process.env.DATABASE_URI,
    collection: "sessions",
    expires: 1000 * 1800,
});

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 100000,
    connectTimeoutMS: 100000,
});

app.use('/api', require('./src/api'));

app.get("*", function (req, res) {
    res.status(404).send({
        message: "No such route found.",
    });
});

mongoose.connection.on("connected", () => {
    const server = app.listen(process.env.PORT || 8080, () => {
        console.log("listening on port %s...", server.address().port);
    });
});

mongoose.connection.on("error", (err) => {
    console.error("Database Connection Error", "Database", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("Database Disconnected", "Database");

    if (server) {
        server.close();
    }
});

const stop = () => {
    mongoose.connection.close(() => {
        process.exit(0);
    });
};

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        process.exit(0);
    });
});

module.exports = app;
module.exports.stop = stop;
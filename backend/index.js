const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
const port = process.env.PORT || 5000;

const { db } = require("./src/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./src/routes"));

app.get("*", function (req, res) {
    res.status(404).send({
        message: "No such route found.",
    });
});

const stop = () => {
    db.close(() => {
        process.exit(0);
    });
};

process.on("SIGINT", () => {
    db.close(() => {
        process.exit(0);
    });
});


const server = http.createServer(app);

db.on("connected", () => {
    console.log("Database connected");
    server.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});

module.exports = { app, stop };

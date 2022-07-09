require('dotenv-flow').config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const logger = require("morgan");
const { Server } = require("socket.io");
const {errorHandler} = require('./src/api/notification/middleware/middleware')
var cors = require('cors')
const app = express();

app.use(logger("dev"));
const port = process.env.PORT || 8000;

const { db } = require("./src/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(errorHandler)
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

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  
  io.on("connection", (socket) => {
      console.log(`User Connected: ${socket.id}`)
  
      socket.on("send_notification", (data) => {
          socket.broadcast.emit("receive_notification", data);
      });
  });

db.on("connected", () => {
    console.log("Database connected");
    server.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});

module.exports = { app, stop };
require("dotenv").config();
const express = require("express");
const server = express();
const { PORT = 3000 } = process.env;
const morgan = require("morgan");
const { client } = require("./db");
client.connect();

server.use(morgan("dev"));

server.use(express.json());

server.use((req, res, next) => {
  console.log("<___Body Logger START___>");
  console.log(req.body);
  console.log("<___Body Logger END___");

  next();
});

const apiRouter = require("./api");
server.use("/api", apiRouter);

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

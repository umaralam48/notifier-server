const http = require("http");
const express = require("express");
const logger = require("morgan");
const webhookRouter = require("./webhook");
const listRouter = require("./list");
const configurewebsocket = require("./socket");
const app = express();
app.use(logger("dev"));
app.use("/webhook", webhookRouter);
app.use("/list", listRouter);

const server = http.createServer(app);
configurewebsocket(server);
const { PORT = 3000 } = process.env;

server.listen(PORT);

console.log(`Listening on port ${PORT}`);

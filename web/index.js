const http = require("http");
const express = require("express");
const webhookRouter = require("./webhook");
const listRouter = require("./list");

const app = express();

app.use("/webhook", webhookRouter);
app.use("/list", listRouter);

const server = http.createServer(app);

const { PORT = 3000 } = process.env;

server.listen(PORT);

console.log(`Listening on port ${PORT}`);

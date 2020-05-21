const express = require("express");
const bodyParser = require("body-parser");
const queue = require("../lib/queue");

const webhookRoute = (req, res) => {
  const message = {
    text: req.body
  };
  queue
    .send("incoming", message)
    .then(() => {
      res.end("Recieved" + JSON.stringify(message));
    })
    .catch(err => {
      console.error(err);
      res.status(500);
      res.end(err.message);
    });
};

const router = express.Router();
router.post("/", bodyParser.text({ type: "*/*" }), webhookRoute);

module.exports = router;

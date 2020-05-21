const queue = require("../lib/queue");
const repo = require("../lib/repo");

const handleIncoming = message =>
  repo.create(message).then(record => {
    console.log("Saved " + JSON.stringify(record));
  });

queue.receive("incoming", handleIncoming).catch(console.error);

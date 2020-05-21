const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/notifier";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", console.error);

const messageSchema = new mongoose.Schema({
  text: String,
  url: String
});

const Message = mongoose.model("Message", messageSchema);

const create = attr => new Message(attr).save();
// async function entry() {
//   for (let i = 1; i <= 1000; i++) {
//     await create({ text: i.toString() });
//   }
// }
// entry();
// console.log("finished");
// create({ text: "HI I am Umar" });

const list = () => Message.find().then(messages => messages.slice().reverse());

module.exports = {
  create,
  list
};

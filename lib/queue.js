const amqp = require("amqplib");

const queueUrl = "amqp://localhost:5672";

const channel = () => {
  return amqp.connect(queueUrl).then(connection => connection.createChannel());
};

const send = (queue, message) =>
  channel().then(channel => {
    const encodedMessage = JSON.stringify(message);
    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(encodedMessage));
    console.log('Sent to "%s" message %s', queue, encodedMessage);
  });

const receive = (queue, handler) =>
  channel().then(channel => {
    channel.assertQueue(queue, { durable: false });
    console.log('Listening for messages on queue "%s"', queue);
    channel.consume(queue, msg => handler(JSON.parse(msg.content.toString())), {
      noAck: true
    });
  });

module.exports = { send, receive };

const wsserver = require("websocket").server;
const queue = require("../lib/queue");
let connection;
const configureWebsockets = (httpServer) => {
	const wserver = new wsserver({ httpServer });

	wserver.on("request", function (request) {
		connection = request.accept(null, request.origin);
		console.log("Accepted connection");

		connection.on("close", function () {
			console.log("closing connection");
			connection = null;
		});
	});
};

queue
	.receive("socket", (message) => {
		if (!connection) {
			console.log("No websocket connection");
			return;
		}
		connection.sendUTF(JSON.stringify(message));
	})
	.catch(console.error);

module.exports = configureWebsockets;

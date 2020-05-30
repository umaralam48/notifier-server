const express = require("express");
const repo = require("../lib/repo");

const listRoute = (req, res) => {
	repo.list()
		.then((messages) => {
			res.setHeader("content-type", "application/json");
			//console.log(messages);
			res.end(JSON.stringify(messages));
		})
		.catch((e) => {
			console.error(e);
			res.status(500);
			res.setHeader("content-type", "application/json");
			res.end(JSON.stringify({ error: e.message }));
		});
};

const router = express.Router();
router.get("/", listRoute);

module.exports = router;

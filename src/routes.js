const express = require("express");
const routes = express.Router();

routes.get("/houses", (req, res) => {
  res.json({ message: "Hello World API" });
});

module.exports = routes;

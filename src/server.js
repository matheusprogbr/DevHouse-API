import express from "express";
import routes from "./routes";

const server = express();

server.use(routes);

server.listen(5000, () => {
  console.log("Server is running!");
});

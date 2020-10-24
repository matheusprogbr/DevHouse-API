import express from "express";
import routes from "./routes";
import init from "./services/mongo";

const server = express();

init();
server.use(express.json());
server.use(routes);

server.listen(5000, () => {
  console.log("Server is running!");
});

import express from "express";
import routes from "./routes";
import init from "./services/mongo";
import path from "path";

const server = express();

init();
server.use("/files", express.static(path.resolve(__dirname,"..","uploads")));
server.use(express.json());
server.use(routes);

server.listen(5000, () => {
  console.log("Server is running!");
});

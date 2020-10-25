import express from "express";
import multer from "multer";
import uploadConfig from "./config/upload";
import SessionController from "./controllers/SessionController";
import HouseController from "./controllers/HouseController";
const routes = express.Router();
const upload = multer(uploadConfig);

routes.post("/session", SessionController.store);
routes.post("/house",upload.single("thumbnail") ,HouseController.store);


export default routes;

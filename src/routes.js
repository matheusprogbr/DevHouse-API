import express from "express";
import multer from "multer";
import uploadConfig from "./config/upload";
import SessionController from "./controllers/SessionController";
import HouseController from "./controllers/HouseController";
import DashboardController from "./controllers/DashboardController";
import ReserveController from "./controllers/ReserveController";

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store);

routes.get("/houses", HouseController.index);
routes.post("/houses",upload.single("thumbnail") ,HouseController.store);
routes.put("/houses/:id", upload.single("thumbnail") ,HouseController.update);
routes.delete("/houses/:id", HouseController.delete);

routes.get("/dashboard", DashboardController.show);

routes.get("/reserves", ReserveController.index);
routes.post("/houses/:id/reserve", ReserveController.store);
routes.delete("/reserves", ReserveController.delete);


export default routes;

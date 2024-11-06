import { Router } from "express";
import { addChargingStation, getAllChargingStations, getChargingStationById } from "../controllers/charging-station.js";
import { chargingStationMediaUpload } from "../middlewares/upload.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create a router
const chargingStationRouter = Router();

// Define routes
chargingStationRouter.post("/chargingstations", isAuthenticated, chargingStationMediaUpload.single("image"), addChargingStation);

chargingStationRouter.get("/chargingstations", isAuthenticated, getAllChargingStations);

chargingStationRouter.get("/chargingstations/:id", isAuthenticated, getChargingStationById);

// Export the router
export default chargingStationRouter;
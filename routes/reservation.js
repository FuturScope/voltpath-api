import { Router } from "express";
import { createReservation, deleteReservation, getAllReservations, getReservationById, updateReservation } from "../controllers/reservation.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create a router
const reservationRouter = Router();

// Define routes
reservationRouter.post("/reservations", isAuthenticated, createReservation);

reservationRouter.get("/reservations", isAuthenticated, getAllReservations);

reservationRouter.get("/reservations/:id", isAuthenticated, getReservationById);

reservationRouter.patch("/reservations/:id", isAuthenticated, updateReservation);

reservationRouter.delete("/reservations/:id", isAuthenticated, deleteReservation);

// Export the router
export default reservationRouter;
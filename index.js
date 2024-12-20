import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/users.js";
import reservationRouter from "./routes/reservation.js";
import chargingStationRouter from "./routes/charging-station.js";

// Connect to database
await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("Error connecting to database", error));

// Create an express app
const app = express();

// Use middlewares
app.use(express.json());
app.use(cors());

// Use routes
app.use(userRouter);
app.use(chargingStationRouter);
app.use(reservationRouter);

// Listen for incoming requests
app.listen(8000, () => {
    console.log("App is listening on port 8080");
});
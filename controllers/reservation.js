import { ReservationModel } from "../models/reservation.js";
import { createRegistrationValidator, updateRegistrationValidator } from "../validators/reservation.js";
import { mailTransporter } from "../utils/mail.js";
import { UserModel } from "../models/users.js";

// Create a new reservation
export const createReservation = async (req, res, next) => {
    try {
        // Validate your inputs
        const { error, value } = createRegistrationValidator.validate
            ({
                ...req.body
            });
        if (error) {
            return res.status(422).json(error);
        }
        // Send resrvation to datebase
        await ReservationModel.create({
            ...value,
            user: req.auth.id
        });
        const user = await UserModel.findOne({ _id: req.auth.id });
        const { email } = user
        // Send email notification
        await mailTransporter.sendMail({
            from: "Voltpath@gnail.com",
            to: email,
            subject: "You have a new reservation",
            html: `<h1>You have a new reservation ${req.body.reservationTime}</h1>`
        });
        // Send the user a response
        res.status(201).json("You have added a reservation!");
    } catch (error) {
        next(error);
    }
}

// Get all reservations
export const getAllReservations = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 15, skip = 0 } = req.query;
        // Add user filter
        const userFilter = { user: req.auth.id };
        // Combine filters
        const combinedFilter = { ...JSON.parse(filter), ...userFilter };
        // Fetch reservations from database 
        const reservations = await ReservationModel
            .find(combinedFilter)
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        // Return a response
        res.status(200).json(reservations);
    } catch (error) {
        next(error);
    }
}

// Get a single reservation by ID
export const getReservationById = async (req, res, next) => {
    try {
        // Find reservation by ID and populate related data
        const reservation = await ReservationModel.findById(req.params.id);
        if (!reservation) return res.status(404).send({ error: "Reservation not found" });
        res.status(200).send(reservation);
    } catch (error) {
        next(error);
    }
}

// Update an existing reservation
export const updateReservation = async (req, res, next) => {
    // Validate incoming data using the reservation schema
    try {
        const { error, value } = updateRegistrationValidator.validate({
            ...req.body
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Find reservation by ID and update with new data
        const reservation = await ReservationModel.
            findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.auth, id
                },
                value, { new: true });
        if (!reservation) {
            return res.status(404).
                json("Reservation not found");
        }
        // Return updated reservation
        res.status(200).json("Your reservation has been updated!");
    } catch (error) {
        next(error);
    }
};

// Delete a reservation
export const deleteReservation = async (req, res, next) => {
    try {
        // Find a reservation by ID and delete it
        const reservation = await ReservationModel.
            findOneAndDelete(
                {
                    _id: req.params.id,
                    user: req.auth.id
                }
            );
        if (!reservation) {
            return res.status(404).json("Reservation not found!");
        }
        res.status(200).json("Reservation deleted!");
    } catch (error) {
        next(error);
    }
}

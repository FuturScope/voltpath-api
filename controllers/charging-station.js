import { ChargingStationModel } from "../models/charging-station.js";
import { chargingStationValidator } from "../validators/charging-station.js";

// Add charging station
export const addChargingStation = async (req, res, next) => {
    try {
        // Validate vendor inputs
        const { error, value } = chargingStationValidator.validate({
            ...req.body,
            image: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Write charging to database
        await ChargingStationModel.create({
            ...value,
            user: req.auth.id
        });
        // Respond to request
        res.status(201).json("Charging station was added!");
    } catch (error) {
        next(error);
    }
}

// Get all charging stations
export const getAllChargingStations = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 15, skip = 0 } = req.query;
        // Fetch ads from database 
        const adverts = await ChargingStationModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        // Return response
        res.status(200).json(adverts);
    } catch (error) {
        next(error);
    }
}

// Get a charging staion by id
export const getChargingStationById = async (req, res) => {
    try {
        const { id } = req.params;
        const station = await ChargingStationModel.findById(id);

        if (!station) {
            return res.status(404).json({
                success: false,
                message: 'Charging station not found.',
            });
        }
        res.status(200).json({
            success: true,
            data: station,
        });
    } catch (error) {
        next(error);
    }
}

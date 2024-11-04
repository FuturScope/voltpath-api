import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const reservationSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: "User", required: true },
        chargingStation: { type: Types.ObjectId, ref: "ChargingStation", required: true },
        reservationTime: { type: Date, required: true },
        status: {
            type: [String], enum: ["reserved", "completed", "cancelled"],
            default: "reserved"
        }
    },
    {
        timestamps: true,
    }
);

reservationSchema.plugin(toJSON);

export const ReservationModel = model("Reservation", reservationSchema);
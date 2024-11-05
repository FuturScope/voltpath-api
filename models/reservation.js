import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const reservationSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: "User", required: true },
        chargingStation: { type: Types.ObjectId, ref: "ChargingStation", required: true },
        reservationTime: { type: Date, required: true },
        price: { type: Number, required: true },
        isAvailable: { type: Boolean, default: true }
    },
    {
        timestamps: true,
    }
);

reservationSchema.plugin(toJSON);

export const ReservationModel = model("Reservation", reservationSchema);
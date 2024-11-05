import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const reservationSchema = new Schema(
    {
        name: { type: String, required: true },
        reservationTime: { type: String, required: true },
        reservationDate: { type: Date, required: true },
        chargerType: { type: String, required: true },
        location: { type: String, required: true },
        user: { type: Types.ObjectId, required: true, ref: "User", },
        chargingStation: { type: Types.ObjectId, required: false, ref: "ChargingStation" },
    }, {
    timestamps: true
});

reservationSchema.plugin(toJSON);

export const ReservationModel = model("Reservation", reservationSchema);
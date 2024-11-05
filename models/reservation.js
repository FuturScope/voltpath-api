import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const reservationSchema = new Schema(
    {
        reservationTime: { type: String, required: true },
        reservationDate: { type: Date, required: true },
        price: { type: Number, required: true },
        isAvailable: { type: Boolean, default: true },
        user: { type: Types.ObjectId, required: true, ref: "User", },
        chargingStation: { type: Types.ObjectId, required: false, ref: "ChargingStation" },
    }, {
    timestamps: true,
}
);

reservationSchema.plugin(toJSON);

export const ReservationModel = model("Reservation", reservationSchema);
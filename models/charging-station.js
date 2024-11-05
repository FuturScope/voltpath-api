import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const chargingStationSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  chargerType: { type: String, required: true },
  chargingSpeed: { type: String, required: true },
  powerOutput: { type: String, required: true },
  price: { type: Number, required: true }
});

chargingStationSchema.plugin(toJSON);

export const ChargingStationModel = model("ChargingStation", chargingStationSchema);

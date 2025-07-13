import mongoose, { Schema, Document } from "mongoose";

export interface IWar extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  involvedCountries: string[];
  casualties: number;
  relatedWars: mongoose.Types.ObjectId[];
  geoData: {
    type: string;
    coordinates: number[][][];
  };
}

const WarSchema = new Schema<IWar>({
  title: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  involvedCountries: [String],
  casualties: Number,
  relatedWars: [{ type: mongoose.Schema.Types.ObjectId, ref: "War" }],
  geoData: {
    type: { type: String, enum: ["Polygon"], default: "Polygon" },
    coordinates: [[[Number]]],
  },
});

export default mongoose.model<IWar>("War", WarSchema);

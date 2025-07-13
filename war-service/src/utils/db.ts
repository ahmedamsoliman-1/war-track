import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    logger.info(`MongoDB connected :: ${process.env.MONGO_URI}`);
  } catch (err) {
    logger.error("MongoDB connection error: %O", err);
    process.exit(1);
  }
};

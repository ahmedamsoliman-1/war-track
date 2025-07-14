import mongoose from "mongoose";

import logger from "./logger";
import { config } from "../config";


export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongo.uri);
    logger.info(`MongoDB connected :: ${config.mongo.uri}`);
  } catch (err) {
    logger.error("MongoDB connection error: %O", err);
    process.exit(1);
  }
};

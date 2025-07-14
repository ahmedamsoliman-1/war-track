import app from "./app";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { connectDB } from "./utils/db";

dotenv.config();

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`War Service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
})();

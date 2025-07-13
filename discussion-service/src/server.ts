import app from "./app";
import dotenv from "dotenv";
import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  logger.info(`Discussion Service running on port ${PORT}`);
});

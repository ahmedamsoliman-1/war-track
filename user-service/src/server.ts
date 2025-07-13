import app from "./app";
import dotenv from "dotenv";
import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  logger.info(`User Service running on port ${PORT}`);
});

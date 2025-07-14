import app from "./app";
import logger from "./utils/logger";
import { config } from "./config";

const PORT = config.server.port;

app.listen(PORT, () => {
  logger.info(`Discussion Service running on port ${PORT}`);
});

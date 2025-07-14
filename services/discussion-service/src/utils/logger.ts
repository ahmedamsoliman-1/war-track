import { createLogger, transports, format } from "winston";
import { config } from "../config";

const log_directory = config.log.directory;


const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "discussion-service" },
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    }),
    new transports.File({ filename: `${log_directory}/error.log`, level: "error" }),
    new transports.File({ filename: `${log_directory}/combined.log` })
  ]
});

export default logger;

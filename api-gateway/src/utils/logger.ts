import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  defaultMeta: { service: "api-gateway" },
  transports: [
    new transports.Console()
  ]
});

import dotenv from "dotenv";

dotenv.config();



export const config = {
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
    password: process.env.REDIS_PASSWORD || undefined,
  },
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/discussion-service",
  },
  server: {
    port: parseInt(process.env.PORT || "4002", 10),
  },
  log: {
    directory: process.env.LOG_DIRECTORY || "logs",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your_jwt_secret",
  },
};
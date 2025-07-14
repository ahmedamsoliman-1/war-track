import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { verifyTokenMiddleware } from "./middlewares/auth";
import { userProxy, warProxy, discussionProxy } from "./routes";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());

// ✅ IMPORTANT: Proxy routes BEFORE express.json()
app.use("/api/users", userProxy);
app.use("/api/wars", verifyTokenMiddleware, warProxy);
app.use("/api/discussions", verifyTokenMiddleware, discussionProxy);

// Optional: Morgan for console logs in dev
app.use(morgan("dev"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.use(express.json());

app.get("/", (_, res) => {
  res.send("API Gateway is running");
});


const server = app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
});

export { app, server };

import express from "express";
import { connectDB } from "./utils/db";
import discussionRoutes from "./routes/discussion.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger";
import logger from "./utils/logger";


const app = express();
connectDB();

app.use(express.json());
app.use("/api/discussions/health", (req, res) => {
  logger.info("Discussion Service health check endpoint hit");
  res.status(200).json({ status: "UP" });
});
app.use("/api/discussions", discussionRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/discussions/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

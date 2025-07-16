import express from "express";
import { connectDB } from "./utils/db";
import userRoutes from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger";
import logger from "./utils/logger";



const app = express();
connectDB();

app.use(express.json());

app.use("/api/users/health", (req, res) => {
  logger.info("Health check endpoint hit");
  res.status(200).json({ status: "UP" });
});
app.use("/api/users", userRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/users/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

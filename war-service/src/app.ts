import express from "express";
import warRoutes from "./routes/war.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger";
import logger from "./utils/logger";

const app = express();

app.use(express.json());


app.use("/api/wars/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

app.use("/api/wars", warRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

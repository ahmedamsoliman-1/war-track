import express from "express";
import { connectDB } from "./utils/db";
import userRoutes from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger";

const app = express();
connectDB();

app.use(express.json());
app.use("/api/users/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});
app.use("/api/users", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

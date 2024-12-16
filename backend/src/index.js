import express from "express";
import dotenv from "dotenv";
import { router as authRoutes } from "./routes/authorization.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/authorization", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, visit http://localhost:${PORT}`);
  connectDB();
});

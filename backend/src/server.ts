import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import moviesRoutes from "./routes/movies";
import bookingRoutes from "./routes/booking";
import authRoutes from "./routes/auth";
import { connectDB } from "./config/db";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/movies", moviesRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

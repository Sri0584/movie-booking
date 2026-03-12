import mongoose from "mongoose";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI as string);
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (err) {
		console.error("MongoDB connection error", err);
		process.exit(1);
	}
};

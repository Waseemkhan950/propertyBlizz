import mongoose from "mongoose";

let connected = false;
const connectDB = async () => {
	try {
		if (connected) {
			console.log("MongoDB is already connected");
			return;
		}
		const conn = await mongoose.connect(process.env.MONGODB_URI_REMOTE, {
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 30000, // Increased from 15000 to 30000
			socketTimeoutMS: 60000, // Increased from 45000 to 60000
			family: 4,
			connectTimeoutMS: 30000, // Increased from 15000 to 30000
			bufferCommands: true, // Enable command buffering
			bufferTimeoutMS: 30000, // Set buffer timeout to 30 seconds
		});

		mongoose.connection.on("error", (err) => {
			console.error("MongoDB connection error:", err);
			connected = false;
		});

		mongoose.connection.on("disconnected", () => {
			console.log("MongoDB disconnected");
			connected = false;
		});

		connected = true;
		console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error("❌ Error connecting to MongoDB:", error);
		connected = false;
		// Don't exit the process, just log the error
		console.error("Connection will be retried on next request");
	}
};

export default connectDB;

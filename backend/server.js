import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import mongoose from "mongoose";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


dotenv.config();

mongoose.set("debug", true);


const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});



// const connectToMongoDB = async () => {
// 	try {
// 	  await mongoose.connect(process.env.MONGO_DB_URI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	  });
// 	  console.log("Connected to MongoDB");
// 	} catch (error) {
// 	  console.log("Error connecting to MongoDB:", error.message);
// 	} finally {
// 	  mongoose.connection.close(); // Clean up
// 	}
//   };
  
  connectToMongoDB();
server.listen(PORT, () => {
	console.log(`Server Running on port ${PORT}`);
});

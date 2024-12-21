import mongoose from "mongoose";

const connectToMongoDB = async () => {
	// console.log('process.env.MONGO_DB_URI',process.env.MONGO_DB_URI)
	try {
		  await mongoose.connect(process.env.MONGO_DB_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			  });
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;





import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(
			`Connected to MongoDB database: ${conn.connection.host}`.cyan
				.underline
		);
	} catch (err) {
		console.log("Error: ", err.message.underline.red.bold);
		process.exit(1);
	}
};

export default connectDB;

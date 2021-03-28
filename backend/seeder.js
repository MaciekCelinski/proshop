import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
//data
import users from "./data/users.js";
import products from "./data/products.js";
//models
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js";
import Order from "./models/OrderModel.js";
//database
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
	try {
		// wipe out all collections
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		// add users from file
		const createdUsers = await User.insertMany(users);
		// get admin user from the createdUsers array
		const adminUser = createdUsers[0]._id;
		// add admin as a creator of all sample products
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});
		// add products from file with a 'user' to the database
		await Product.insertMany(sampleProducts);
		console.log("Data Imported".green.inverse);
		process.exit();
	} catch (error) {
		console.log(`Error: ${error.message}`.red.bold);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		// wipe out all collections
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log("Data destroyed".red.inverse);
		process.exit();
	} catch (error) {
		console.log(`Error: ${error.message}`.red.bold);
		process.exit(1);
	}
};

// now we want to run this only by script "node backend seeder -d"
// in order to get '-d' we need to do this:
if (process.argv[2] === "-d") {
	destroyData();
} else {
	importData();
}

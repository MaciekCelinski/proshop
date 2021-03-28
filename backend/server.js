import express from "express";
import dotenv from "dotenv";
import colors from "colors";
// database connection
import connectDB from "./config/db.js";
// routes
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

connectDB();

// routes
app.get("/", (req, res) => {
	res.send("Api is running");
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow
			.bold
	)
);

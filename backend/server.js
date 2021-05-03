import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
// database connection
import connectDB from "./config/db.js";
// routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
// middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

connectDB();

// middleware
app.use(express.json());

// app.use((req, res, next) => {
// 	// console.log(req.originalUrl);

// 	next();
// });

// routes
app.get("/", (req, res) => {
	res.send("Api is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// paypal route
app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);



// normally '__dirname' is normal in express but not when we use ES6
// we need to mimic this:
const __dirname = path.resolve();

// we have to make upload folder static !!
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// handle error route
app.use(notFound);

// handle other errors
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow
			.bold
	)
);

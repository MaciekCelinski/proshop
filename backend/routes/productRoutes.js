import express from "express";
import asyncHandler from "express-async-handler";
// import model
import Product from "../models/ProductModel.js";
// init router
const router = express.Router();

// GET all
// @access public
router.get(
	"/",
	asyncHandler(async (req, res) => {
		const products = await Product.find({});
		res.status(401);
		throw Error("NOT AUTHORIZED");
		res.json(products);
	})
);

// GET one
// @access public
router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);

		if (product) {
			res.json(product);
		} else {
			res.status(404);
			// now this goes to error middleware and is treated as err.message in errorHandler
			throw new Error("Product not found");
			// res.status(404).json({ message: "Product not found" });
		}
	})
);

export default router;

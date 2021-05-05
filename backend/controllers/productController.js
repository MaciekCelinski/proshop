import asyncHandler from "express-async-handler";
// import model
import Product from "../models/ProductModel.js";

// GET all
// @access public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// GET one
// @access public

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		// now this goes to error middleware and is treated as err.message in errorHandler
		throw new Error("Product not found");
		// res.status(404).json({ message: "Product not found" });
	}
});

// DELETE one
// @access private/admin
// @route DELETE /api/products/:id

const deleteProduct = asyncHandler(async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (product) {
			const deletedProduct = await product.remove();
			// res.status(200).json(deletedProduct);
			res.status(200).json({ message: "Product deleted" });
		}
	} catch (error) {
		res.status(404).json(error.message || { message: "Product not found" });
	}
});

// CREATE product
// @access private/admin
// @route POST /api/products

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Dell Alienware",
		price: 0,
		user: req.user._id,
		image: "/images/alienware.jpg",
		brand: "Dell",
		category: "laptops",
		countInStock: 0,
		numReviews: 0,
		description: "Gaming laptop",
	});

	const createProduct = await product.save();
	res.status(201).json(createProduct);
});

// UPDATE product
// @access private/admin
// @route PUT /api/products/:id

const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		image,
		brand,
		category,
		description,
		price,
		countInStock,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.description = description;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// POST review
// @access private
// @route PUT /api/products/:id/reviews

const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(review) => review.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error("Product already reviewed");
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: "Review added" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
};

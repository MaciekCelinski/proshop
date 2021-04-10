import asyncHandler from "express-async-handler";
// import model
import Order from "../models/OrderModel.js";

// POST /api/orders => Create new order
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No order items");
		return;
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

// GET /api/orders/:id => GET ORDER BY ID
// @access private
const getOrderById = asyncHandler(async (req, res) => {
	// .populate will get the user name and email from User model
	const order = (await Order.findById(req.params.id)).populate(
		"user",
		"name email"
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

export { addOrderItems, getOrderById };

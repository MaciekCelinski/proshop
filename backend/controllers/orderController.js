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
	const order = await Order.findById(req.params.id).populate(
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

// UPDATE /api/orders/:id/pay => UPDATE ORDER to "paid"
// @access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	// .populate will get the user name and email from User model
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		// paypal response
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// GET /api/orders/myorders => GET logged in user ORDERs
// @access private

const getMyOrders = asyncHandler(async (req, res) => {
	console.log('hello')
	try {
		console.log("req:", req);
		const orders = await Order.find({ user: req.user._id });
		res.json(orders);
	} catch (error) {
		res.status(404);
		throw new Error("Order not found");
	}
});

// GET /api/orders/ => GET all aorders
// @access private

const getOrders = asyncHandler(async (req, res) => {
	try {
		const orders = await Order.find({}).populate('user', 'id name');
		res.json(orders);
	} catch (error) {
		res.status(404);
		throw new Error("Order not found");
	}
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders };

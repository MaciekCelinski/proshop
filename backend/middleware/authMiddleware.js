import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

const protect = asyncHandler(async (req, res, next) => {
	// console.log(req.headers.authorization);

	let token = req.headers.authorization.split(" ")[1];

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// console.log('decoded user: ', decoded)

			// we want to get user without the password value
			req.user = await User.findById(decoded.id).select("-password");
			// console.log(req.user);
			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

const admin = (req, res, next) => {
	console.log("req.user:", req.user)
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error("Not authorized as an admin");
	}
};

export { protect, admin };

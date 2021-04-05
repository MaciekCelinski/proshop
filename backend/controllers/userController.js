import asyncHandler from "express-async-handler";
// import model
import User from "../models/UserModel.js";
// import token generator
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// POST     /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		return res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401); // Unauthorized
		throw new Error("Invalid email or password");
	}

	// res.send({ email, password });
});

// @desc    Register a new user
// POST     /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400); // Bad request
		throw new Error("User already exists");
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		return res.status(201) // Created
			.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}

	res.send({ email, password });
});

// @desc    Auth user profile
// POST     /api/users/profile
// @access  private

const getUserProfile = asyncHandler(async (req, res) => {
	// we get req.user from authMiddleware
	const user = await User.findById(req.user._id);

	if (user) {
		return res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404); // Not found
		throw new Error("User not found");
	}
});

export { authUser, registerUser, getUserProfile };

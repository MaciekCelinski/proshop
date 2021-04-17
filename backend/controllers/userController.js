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
		return res
			.status(201) // Created
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

// @desc    Update user profile
// PUT     	/api/users/profile
// @access  private

const updateUserProfile = asyncHandler(async (req, res) => {
	// we get req.user from authMiddleware
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		return res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404); // Not found
		throw new Error("User not found");
	}
});

// ---------- ADMIN -------------
// @desc    GET all users
// PUT     	/api/users
// @access  private/admin

const getUsers = asyncHandler(async (req, res) => {
	try {
		const users = await User.find({});
		res.json(users);
	} catch (error) {
		res.status(404); // Not found
		throw new Error("User not found");
	}
});

// @desc    delete user
// DELETE   /api/users/:id
// @access  private/admin

const deleteUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (user) {
			await user.remove();
			res.json({ message: "User removed" });
		}
	} catch (error) {
		res.status(404); // Not found
		throw new Error("User not found");
	}
});

// @desc    get user
// GET   /api/users/:id
// @access  private/admin

const getUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select("-password");
		if (user) {
			res.json(user);
		}
	} catch (error) {
		res.status(404); // Not found
		throw new Error("User not found");
	}
});

// @desc    update user
// PUT   /api/users/:id
// @access  private/admin

const updateUser = asyncHandler(async (req, res) => {
	console.log("req.user: ", req.user);
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();

		return res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404); // Not found
		throw new Error("User not found");
	}
});

export {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUser,
	updateUser,
};

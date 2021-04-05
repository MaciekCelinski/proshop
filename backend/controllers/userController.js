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
		res.status(401);
		throw new Error("Invalid email or password");
	}

	res.send({ email, password });
});

export { authUser };

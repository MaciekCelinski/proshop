import jwt from "jsonwebtoken";

// we want to add only id to the token
// second argument is a SECRET

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

export default generateToken;

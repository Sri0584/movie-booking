import { Router } from "express";
import { User } from "../models/Users";
import jwt from "jsonwebtoken";

const router = Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
	const { email, password } = req.body;
	debugger;
	const existing = await User.findOne({ email });
	if (!existing) {
		const user = await User.create({ email, password });
		res.status(200).json({ user: user._id, email: user.email });
	} else {
		return res
			.status(400)
			.json({ message: "User already registered. Please login!!" });
	}
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user || !(await user.comparePassword(password))) {
		return res
			.clearCookie("token")
			.status(401)
			.json({ message: "Invalid username/password !!" });
	}
	const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET as string, {
		expiresIn: "1h",
	});

	// httpOnly cookie for security
	res
		.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		})
		.json({ id: user?._id, email: user?.email });
});

export default router;

import { Router } from "express";
import { auth, AuthRequest } from "../middleware/auth";
import { Movie } from "../models/Movie";
import { Booking } from "../models/Booking";

const router = Router();

// POST /api/booking
router.post("/", auth, async (req: AuthRequest, res) => {
	try {
		const { movieId, showTime, seats } = req.body;

		if (!movieId || !showTime || !seats || seats.length === 0) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const movie = await Movie.findById(movieId);
		if (!movie) return res.status(404).json({ message: "Movie not found" });

		const booking = await Booking.create({
			user: req.userId,
			movie: movieId,
			showTime,
			seats,
			status: "CONFIRMED",
		});

		res.status(201).json({
			id: booking._id.toString(),
			user: booking.user.toString(),
			movie: booking.movie.toString(),
			seats: booking.seats,
			showTime: booking.showTime,
			status: booking.status,
		});
	} catch (error: any) {
		res.status(500).json({
			message: "Error creating booking",
			error: error.message,
		});
	}
});

// GET /api/booking/my
router.get("/my", auth, async (req: AuthRequest, res) => {
	const bookings = await Booking.find({ user: req.userId })
		.populate("movie")
		.lean();
	if (!bookings) res.json({ message: "No bookings on your name" });
	res.json(bookings);
});

export default router;

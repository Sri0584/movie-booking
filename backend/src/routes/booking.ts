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
		console.log(movieId, "movieId");

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

// GET /api/booking/my-tickets
router.get("/my-tickets", auth, async (req: AuthRequest, res) => {
	const bookings = await Booking.find({ user: req.userId })
		.populate("movie")
		.lean();
	if (bookings.length === 0)
		return res.status(404).json({ message: "No bookings on your name" });
	console.log(bookings);
	const missing = bookings.find((b) => !(b.movie as any)?.title);
	if (missing) {
		return res.status(404).json({
			message: "A booked movie was deleted",
			bookingId: (missing as any)._id?.toString?.(),
		});
	}
	const bookedTickets = bookings.map((booking) => {
		const { movie, seats, showTime } = booking;
		const title = (movie as any)?.title ?? "Unknown movie (deleted?)";
		return `Movie: ${title} - Seats: ${seats.join(", ")} - Show Time: ${new Date(
			showTime,
		).toLocaleString()}`;
	})
	res.json(bookedTickets);
});

export default router;

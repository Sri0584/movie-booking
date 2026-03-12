import { Router } from "express";
import { Movie } from "../models/Movie";

const router = Router();

// POST /api/movies/seed - Fetch from OMDB API and insert into database
router.post("/seed", async (req, res) => {
	try {
		const response = await fetch(
			"https://www.omdbapi.com/?s=master&apikey=bedf03fc",
		);
		const data = await response.json();

		if (!data.Search || !Array.isArray(data.Search)) {
			return res.status(400).json({ message: "No movies found from API" });
		}

		// Transform OMDB data to match Movie schema
		const moviesToInsert = data.Search.map((movie: any) => ({
			title: movie.Title,
			poster: movie.Poster !== "N/A" ? movie.Poster : "",
			description: `${movie.Type} (${movie.Year})`,
			rating: 0, // Default rating; fetch from IMDb details if needed
			durationMinutes: 120, // Default duration; fetch from IMDb details if needed
		}));

		// Clear existing movies and insert new ones
		await Movie.deleteMany({});
		const inserted = await Movie.insertMany(moviesToInsert);

		res.status(201).json({
			message: `Successfully inserted ${inserted.length} movies`,
			movies: inserted,
		});
	} catch (error: any) {
		res.status(500).json({
			message: "Error fetching or inserting movies",
			error: error.message,
		});
	}
});

// GET /api/movies
router.get("/", async (req, res) => {
	const movies = await Movie.find().lean();
	const transformed = movies.map((movie: any) => ({
		id: movie._id.toString(),
		title: movie.title,
		poster: movie.poster,
		description: movie.description,
		rating: movie.rating,
		durationMinutes: movie.durationMinutes,
	}));
	res.json(transformed);
});

// GET /api/movies/:id
router.get("/:id", async (req, res) => {
	const movie = await Movie.findById(req.params?.id).lean();
	if (!movie) return res.status(404).json({ message: "Movie not found!" });
	const transformed = {
		id: movie._id.toString(),
		title: movie.title,
		poster: movie.poster,
		description: movie.description,
		rating: movie.rating,
		durationMinutes: movie.durationMinutes,
	};
	res.json(transformed);
});
export default router;

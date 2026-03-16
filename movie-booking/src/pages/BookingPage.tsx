import { H2, Text, Button } from "@salt-ds/core";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SeatSelector from "../features/booking/SeatSelector";
import { useCreateBookingMutation } from "../features/booking/bookingApi";
import { useGetMovieByIdQuery } from "../features/movies/moviesApi";

const BookingPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
	const [showTime, setShowTime] = useState("2026-12-02T10:00");
	const [bookingError, setBookingError] = useState<string | null>(null);
	const [bookingSuccess, setBookingSuccess] = useState(false);

	const { data: movie, isLoading: isMovieLoading } = useGetMovieByIdQuery(
		id || "",
		{ skip: !id },
	);
	const [createBooking, { isLoading: isBookingLoading }] =
		useCreateBookingMutation();

	// Redirect after 3 seconds on success
	useEffect(() => {
		if (bookingSuccess) {
			const timer = setTimeout(() => {
				navigate("/");
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [bookingSuccess, navigate]);

	const handleSeatsSelected = (seats: string[]) => {
		setSelectedSeats(seats);
	};

	const handleConfirmBooking = async () => {
		if (!id || selectedSeats.length === 0) {
			setBookingError("Please select seats");
			return;
		}

		setBookingError(null);
		try {
			await createBooking({
				movieId: id,
				seats: selectedSeats,
				showTime,
			}).unwrap();

			setBookingSuccess(true);
		} catch (error: any) {
			setBookingError(error.data?.message || error.message || "Booking failed");
		}
	};

	const formatted = (dt: string) => {
		const dt1 = new Date(dt);
		const day = dt1.toLocaleDateString("en-US", { weekday: "long" });
		const formattedDate = dt1.toLocaleDateString("en-US");
		const formattedTime = dt1.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});

		return formattedDate + formattedTime + " " + day;
	};

	if (isMovieLoading) return <Text>Loading movie...</Text>;
	if (!movie) return <Text>Movie not found</Text>;

	if (bookingSuccess) {
		return (
			<main style={{ textAlign: "center", padding: "40px" }}>
				<H2
					aria-label='Booking confirmed'
					aria-labelledby='Booking confirmed'
					style={{ color: "green" }}
				>
					✓ Booking Confirmed!
				</H2>
				<Text
					aria-label='Booking confirmed message'
					aria-labelledby='Booking confirmed message'
					role='alert'
					aria-live='assertive'
					aria-atomic='true'
					as='p'
					style={{ fontSize: "16px", marginTop: "10px" }}
				>
					Your booking is confirmed for the seats {selectedSeats.join(", ")} on
					{formatted(showTime)} . Redirecting to home...
				</Text>
				<Button
					appearance='solid'
					onClick={() => navigate("/")}
					aria-label='Back to home'
					aria-labelledby='Back to home'
				>
					<Text aria-label='Back to home' aria-labelledby='Back to home'>
						Back to home
					</Text>
				</Button>
			</main>
		);
	}

	return (
		<div>
			<H2>Book Seats - {movie.title}</H2>
			{bookingError && <Text className='error'>{bookingError}</Text>}

			<div className='m-b-20'>
				<label>
					Show Time:{" "}
					<input
						type='datetime-local'
						value={showTime}
						onChange={(e) => setShowTime(e.target.value)}
					/>
				</label>
			</div>

			<SeatSelector onSeatsSelected={handleSeatsSelected} />

			{selectedSeats.length > 0 && (
				<div style={{ marginTop: "20px", textAlign: "center" }}>
					<Button
						appearance='solid'
						onClick={handleConfirmBooking}
						disabled={isBookingLoading}
					>
						{isBookingLoading ? "Confirming..." : "Confirm Booking"}
					</Button>
				</div>
			)}
		</div>
	);
};

export default BookingPage;

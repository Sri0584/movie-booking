import { FlexLayout, Text, Button } from "@salt-ds/core";
import { useGetMoviesQuery } from "../features/movies/moviesApi";
import { useSeedMoviesMutation } from "../features/movies/moviesApi";
import MovieCard from "../components/UI/MovieCard";
import type { Movie } from "../features/movies/types";
import { useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";
import { useGetBookedTicketsQuery } from "../features/booking/bookingApi";
import { getRtkErrorMessage } from "../utils/helpers";

const Home = () => {
	const navigate = useNavigate();
	const {
		data: moviesData,
		isLoading,
		isError: isMoviesError,
		error: moviesError,
	} = useGetMoviesQuery();
	const [seed, { isLoading: isSeeding }] = useSeedMoviesMutation();
	const {
		data: bookedTickets,
		isError: isBookingError,
		error,
	} = useGetBookedTicketsQuery();
	const moviesErrormessage =
		isMoviesError ? getRtkErrorMessage(moviesError) : "";
	const bookingErrormessage = isBookingError ? getRtkErrorMessage(error) : "";

	const [seedMessage, setSeedMessage] = useState<string | null>(null);

	const handleSeedMovies = async () => {
		setSeedMessage(null);
		try {
			const result = await seed().unwrap();
			setSeedMessage(result.message);
		} catch (error: any) {
			setSeedMessage(error.data?.message || "Failed to seed movies");
		}
	};

	if (isLoading) return <Text className='message'>Loading movies...</Text>;
	if (isMoviesError)
		return <Text className='error message'>{moviesErrormessage}</Text>;

	return (
		<Suspense fallback={<Text>Loading...</Text>}>
			<div className='m-b-20'>
				<Button
					appearance='solid'
					onClick={handleSeedMovies}
					disabled={isSeeding}
				>
					{isSeeding ? "Seeding..." : "Seed Movies"}
				</Button>
				{seedMessage && (
					<Text className='message'>
						<b>{seedMessage}</b>
					</Text>
				)}
			</div>
			<div>
				<Text>
					<span style={{ fontWeight: "bold", color: "blueviolet" }}>
						Your booked tickets:
					</span>
					<span className='message'>
						{bookedTickets && ` ${bookedTickets.join(", ")}`}
					</span>
				</Text>
				{bookingErrormessage && (
					<Text className='error message'>{bookingErrormessage}</Text>
				)}
			</div>

			<FlexLayout gap={3} wrap>
				{moviesData?.map((movie: Movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						onBook={() => navigate(`/booking/${movie.id}`)}
					/>
				))}
			</FlexLayout>
		</Suspense>
	);
};

export default Home;

import { FlexLayout, Text, Button, H2 } from "@salt-ds/core";
import { useGetMoviesQuery } from "../features/movies/moviesApi";
import { useSeedMoviesMutation } from "../features/movies/moviesApi";
import MovieCard from "../components/UI/MovieCard";
import type { Movie } from "../features/movies/types";
import { useNavigate } from "react-router-dom";
import { Suspense, useRef, useState } from "react";
import { useGetBookedTicketsQuery } from "../features/booking/bookingApi";
import { getRtkErrorMessage } from "../utils/helpers";
import { useAppSelector } from "../app/hooks";

const Home = () => {
	const navigate = useNavigate();
	const {
		data: moviesData,
		isLoading,
		isError: isMoviesError,
		error: moviesError,
	} = useGetMoviesQuery();
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
	const [seed, { isLoading: isSeeding }] = useSeedMoviesMutation();
	const bookingLoadingRef = useRef(false);
	const {
		data: bookedTickets,
		isError: isBookingError,
		error,
	} = useGetBookedTicketsQuery(undefined, { skip: !isAuthenticated });
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
			<main>
				<section className='m-b-20'>
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
				</section>
				{isAuthenticated && <section aria-label='Your booked tickets'>
					<Text>
						<span style={{ fontWeight: "bold", color: "blueviolet" }}>
							Your booked tickets:
						</span>
						<FlexLayout gap={3} wrap as='ul'>
							{bookedTickets?.map((booking) => (
								<li className='message' key={booking}>
									<Text className='message'>{booking}</Text>
								</li>
							))}
						</FlexLayout>
					</Text>
					{bookingErrormessage && (
						<Text className='error message'>{bookingErrormessage}</Text>
					)}
				</section>}
				<section aria-label='Available movies'>
					<H2>Available movies</H2>
					<FlexLayout gap={3} wrap>
						{moviesData?.map((movie: Movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								onBook={() => {
									bookingLoadingRef.current = true;
									navigate(`/booking/${movie.id}`);
								}}
								isBookingLoading={bookingLoadingRef.current}
							/>
						))}
					</FlexLayout>
				</section>
			</main>
		</Suspense>
	);
};

export default Home;

import { FlexLayout, Text, Button } from "@salt-ds/core";
import { useGetMoviesQuery } from "../features/movies/moviesApi";
import { useSeedMoviesMutation } from "../features/movies/moviesApi";
import MovieCard from "../components/UI/MovieCard";
import type { Movie } from "../features/movies/types";
import { useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";

const Home = () => {
	const navigate = useNavigate();
	const { data, isLoading, isError } = useGetMoviesQuery();
	const [seed, { isLoading: isSeeding }] = useSeedMoviesMutation();
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

	if (isLoading) return <Text>Loading movies...</Text>;
	if (isError) return <Text>Failed to load movies.</Text>;

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
					<Text style={{ marginLeft: "10px" }}>{seedMessage}</Text>
				)}
			</div>
			<FlexLayout gap={3} wrap>
				{data?.map((movie: Movie) => (
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

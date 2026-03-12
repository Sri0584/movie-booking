import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../features/movies/moviesApi";
import { H2, Text } from "@salt-ds/core";

const MoviePage = () => {
	const { id } = useParams();
	const { data: movie } = useGetMovieByIdQuery(id!);
	if (!movie) return <Text>Movie not found..</Text>;
	return (
		<>
			<H2>{movie.title}</H2>
			<img src={movie.poster} alt={movie.title} width='300' />
			<Text>{movie.description}</Text>
		</>
	);
};

export default MoviePage;

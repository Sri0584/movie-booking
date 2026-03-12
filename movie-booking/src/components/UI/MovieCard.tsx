import type { Movie } from "../../features/movies/types";
import { Button, Card, FlexLayout, H2, Text } from "@salt-ds/core";

interface Props {
	movie: Movie;
	onBook?: (id: string) => void;
}

const MovieCard = ({ movie, onBook }: Props) => {
	return (
		<Card className='card'>
			<img src={movie.poster} alt={movie.title} className='card-image' />
			<H2>{movie.title}</H2>
			<Text>{movie.description.slice(0, 80)}...</Text>
			<FlexLayout justify='space-between' align='center'>
				<Text>⭐ {movie.rating}</Text>
				<Button appearance='solid' onClick={() => onBook?.(movie.id)}>
					Book
				</Button>
			</FlexLayout>
		</Card>
	);
};

export default MovieCard;

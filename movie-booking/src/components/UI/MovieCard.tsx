import type { Movie } from "../../features/movies/types";
import { Button, Card, FlexLayout, H3, Spinner, Text } from "@salt-ds/core";

interface Props {
	movie: Movie;
	onBook?: (id: string) => void;
	isBookingLoading?: boolean;
}

const MovieCard = ({ movie, onBook, isBookingLoading = false }: Props) => {
	return (
		<Card className='card'>
			<img src={movie.poster}
				alt={`Poster for ${movie.title}`}
				width='300'
				height='450'
				className='card-image'
				aria-label='Movie poster'
				aria-labelledby={`Poster for ${movie.title}`}
				loading='lazy'
				decoding='async' />
			<H3 aria-label='Movie title' aria-labelledby={`Title for ${movie.title}`}>{movie.title}</H3>
			<Text aria-label='Movie description' aria-labelledby={`Description for ${movie.title}`}>{movie.description?.length > 80 ? movie.description.slice(0, 80) : movie.description}...</Text>
			<FlexLayout justify='space-between' align='center'>
				<Text aria-label='Movie rating' aria-labelledby={`Rating for ${movie.title}`}>⭐ {movie.rating}</Text>
				<Button appearance='solid' onClick={() => onBook?.(movie.id)} aria-label={`Book ${movie.title}`} aria-busy={isBookingLoading} aria-disabled={isBookingLoading}>
					{isBookingLoading ? <Spinner aria-label='Booking in progress...' aria-busy={isBookingLoading} aria-disabled={isBookingLoading} aria-live='polite' aria-atomic='true' /> : "Book"}
				</Button>
			</FlexLayout>
		</Card>
	);
};

export default MovieCard;

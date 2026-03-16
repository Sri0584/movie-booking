import { useNavigate, useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../features/movies/moviesApi";
import { Button, H2, H3, Spinner, Text } from "@salt-ds/core";

const MoviePage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data: movie, isLoading: isMovieLoading, isError: isMovieError } = useGetMovieByIdQuery(id ?? '', { skip: !id });
	
	if (!id) return <main>
		<Text className='error message' role='alert' aria-live='assertive' as='p'>
			<H3 aria-label='Invalid movie ID...' aria-labelledby='Invalid movie ID...'>Invalid movie ID..</H3>
			<Text aria-label='Invalid movie ID message' aria-labelledby='Invalid movie ID message'>
				<strong aria-label='Invalid movie ID message' aria-labelledby='Invalid movie ID message'>Invalid movie link (missing id).</strong>
			</Text>
		</Text>
	</main>;

	if (isMovieLoading) return <main>
		<Spinner aria-label='Loading movie...'
			aria-busy={isMovieLoading}
			aria-disabled={isMovieLoading}
			aria-live='polite' aria-atomic='true' />
	</main>;
	if (isMovieError) return <main>
		<Text className='error message'
			role='alert' aria-live='assertive'
			aria-atomic='true' as='p'>
			<H3 aria-label='Error loading movie...' aria-labelledby='Error loading movie...'>Error loading movie..</H3>
		</Text>
	</main>
	if (!movie) return <main>
		<Text className='error message' role='alert' aria-live='assertive' as='p'>
			<H3 aria-label='Movie not found...' aria-labelledby='Movie not found...'>Movie not found..</H3>
		</Text>
	</main>;

	return (
		<main aria-label='Movie page'>
			<section aria-label='Movie details'>
				<H2 aria-label='Movie title' aria-labelledby={`Title for ${movie.title}`}>{movie.title}</H2>
				<img src={movie.poster} alt={`Poster for ${movie.title}`}
					width='300' aria-label='Movie poster' aria-labelledby={`Poster for ${movie.title}`} />
				<Text aria-label='Movie description' aria-labelledby={`Description for ${movie.title}`}>{movie.description}</Text>
				<Button appearance='solid' onClick={() => navigate(`/booking/${id}`)} aria-label={`Book ${movie.title}`} aria-busy={isMovieLoading} aria-disabled={isMovieLoading}>
					<Text aria-label='Book movie' aria-labelledby={`Book ${movie.title}`}>Book</Text>
				</Button>
			</section>
			<section aria-label='Booking options'>
				<H3 aria-label='Booking options' aria-labelledby={`Booking options for ${movie.title}`}>
					<Text aria-label='Booking options' aria-labelledby={`Booking options for ${movie.title}`}>Booking options</Text>
				</H3>
				<ul>
					<li>
						<Button appearance='solid'
							onClick={() => navigate(`/booking/${id}`)}
							aria-label={`Book ${movie.title}`}
							aria-busy={isMovieLoading}
							aria-disabled={isMovieLoading}>
							{isMovieLoading ? <Spinner /> : "Book"}
						</Button>
						<Text aria-labelledby={`Booking option for ${movie.title}`}>{movie.description}</Text>
					</li>
				</ul>
			</section>
		</main>
	);
};

export default MoviePage;

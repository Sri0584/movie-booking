import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Movie } from "./types";

export const moviesApi = createApi({
	reducerPath: "moviesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	tagTypes: ["Movies"],
	endpoints: (builder) => ({
		getMovies: builder.query<Movie[], void>({
			query: () => "/movies",
			providesTags: ["Movies"],
		}),
		getMovieById: builder.query<Movie, string>({
			query: (id) => `/movies/${id}`,
		}),
		seedMovies: builder.mutation<
			{ message: string; movies: Movie[] },
			void
		>({
			query: () => ({
				url: "/movies/seed",
				method: "POST",
			}),
			invalidatesTags: ["Movies"],
		}),
	}),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery, useSeedMoviesMutation } = moviesApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Minimal types; adjust or expand in a separate file if needed
export interface User {
	id: string;
	email: string;
}

export interface AuthResponse {
	email: string;
	id: string;
	user: User;
	token: string;
}

// the server may also return a simple message (e.g. "already registered")
export type RegisterResponse = AuthResponse | { message: string };

export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		register: builder.mutation<
			RegisterResponse,
			{ email: string; password: string }
		>({
			query: (credentials) => ({
				url: "/register",
				method: "POST",
				body: credentials,
			}),
		}),
		login: builder.mutation<AuthResponse, { email: string; password: string }>({
			query: (credentials) => ({
				url: "/login",
				method: "POST",
				body: credentials,
			}),
		}),
		getProfile: builder.query<User, void>({
			query: () => "/profile",
			providesTags: ["User"],
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation, useGetProfileQuery } =
	usersApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BookingRequest, BookingResponse } from "./types";

export const bookingApi = createApi({
	reducerPath: "bookingApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/booking" }),
	tagTypes: ["Booking"],
	endpoints: (builder) => ({
		createBooking: builder.mutation<BookingResponse, BookingRequest>({
			query: (booking) => ({
				url: "/",
				method: "POST",
				body: booking,
			}),
			invalidatesTags: ["Booking"],
		}),
		getBookedTickets: builder.query<string[], void>({
			query: () => "/my-tickets",
			providesTags: ["Booking"],
		}),
	}),
});

export const { useCreateBookingMutation, useGetBookedTicketsQuery } =
	bookingApi;

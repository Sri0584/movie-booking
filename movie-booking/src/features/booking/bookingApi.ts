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
	}),
});

export const { useCreateBookingMutation } = bookingApi;

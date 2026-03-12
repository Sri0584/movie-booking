import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "../features/movies/moviesApi";
import { usersApi } from "../features/auth/usersApi";
import { bookingApi } from "../features/booking/bookingApi";
import authReducer from "./authSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[moviesApi.reducerPath]: moviesApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[bookingApi.reducerPath]: bookingApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(moviesApi.middleware)
			.concat(usersApi.middleware)
			.concat(bookingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

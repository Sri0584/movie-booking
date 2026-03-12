import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { usersApi } from "../features/auth/usersApi";

export interface User {
	id: string;
	email: string;
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
	},
	extraReducers: (builder) => {
		// Handle successful login
		builder.addMatcher(
			usersApi.endpoints.login.matchFulfilled,
			(state, action) => {
				state.user = {
					id: action.payload.id,
					email: action.payload.email,
				};
				state.isAuthenticated = true;
			}
		);

		// Handle successful register
		builder.addMatcher(
			usersApi.endpoints.register.matchFulfilled,
			(state, action) => {
				// Only set user if response has user data (not just a message)
				if ("user" in action.payload && action.payload.user) {
					state.user = action.payload.user;
					state.isAuthenticated = true;
				}
			}
		);
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

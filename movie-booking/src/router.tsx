import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

// Lazy-loaded pages for performance
const Home = lazy(() => import("./pages/Home"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },

			{
				path: "movie/:id",
				element: <MoviePage />,
			},

			{
				path: "booking/:id",
				element: (
					<ProtectedRoute>
						<BookingPage />
					</ProtectedRoute>
				),
			},

			{ path: "login", element: <Login /> },
			{ path: "register", element: <Register /> },

			{ path: "*", element: <NotFound /> },
		],
	},
]);

import { type ReactNode } from "react";
import { useAppSelector } from "./app/hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
	if (!isAuthenticated) return <Navigate to={"/login"} replace />;
	return children;
};

export default ProtectedRoute;

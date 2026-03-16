import { FlexLayout, Text } from "@salt-ds/core";
import { Suspense, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "../UI/Loader";

interface AppLayoutProps {
	children?: ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
	return (
		<FlexLayout direction={"column"} className='app-layout'>
			<Header />
			<main className='main'>
				<Suspense fallback={<Loader/>}>
					{children || <Outlet />}
				</Suspense>
			</main>
			<Footer />
		</FlexLayout>
	);
};

export default AppLayout;

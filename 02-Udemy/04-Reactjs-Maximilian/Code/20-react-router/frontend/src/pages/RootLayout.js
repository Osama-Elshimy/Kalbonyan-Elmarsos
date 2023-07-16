import React from "react";
import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
	return (
		<React.Fragment>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		</React.Fragment>
	);
};

export default RootLayout;

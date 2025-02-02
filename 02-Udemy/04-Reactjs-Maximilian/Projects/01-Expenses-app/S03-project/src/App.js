import React from "react";

import Expenses from "./components/Expenses/Expenses";

function App() {
	const headerStyle = {
		textAlign: "center",
		fontSize: "2.4rem",
		color: "#00eff0",
	};

	// Data
	const expenses = [
		{
			id: "e1",
			title: "New Laptop",
			amount: 1800,
			date: new Date(2023, 2, 21),
		},
		{ id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
		{
			id: "e3",
			title: "Car Insurance",
			amount: 294.67,
			date: new Date(2021, 2, 28),
		},
		{
			id: "e4",
			title: "New Desk (Wooden)",
			amount: 450,
			date: new Date(2021, 5, 12),
		},
	];

	return (
		<div>
			<h2 style={headerStyle}>Let's get started!</h2>
			<Expenses items={expenses} />
		</div>
	);
}

export default App;

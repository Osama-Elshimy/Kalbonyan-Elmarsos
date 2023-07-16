import React, { useState } from "react";

import AddUser from "./Components/Users/AddUser";
import UsersList from "./Components/Users/UsersList";

function App() {
	const [usersList, setUserList] = useState([]);

	const addUserHandler = (uName, uAge) => {
		setUserList(prevUsersList => [
			...prevUsersList,
			{ name: uName, age: uAge, id: Math.random().toString() },
		]);
	};

	return (
		<div>
			<AddUser onAddUser={addUserHandler} />
			<UsersList users={usersList} />
		</div>
	);
}

export default App;

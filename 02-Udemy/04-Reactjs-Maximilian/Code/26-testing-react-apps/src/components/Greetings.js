import React, { useState } from "react";

import Output from "./Output";

const Greetings = () => {
	const [changedText, setChangedText] = useState(false);

	const changeTextHandler = function () {
		setChangedText(true);
	};

	return (
		<>
			<h2>Hello World!</h2>
			{!changedText && <Output>It's nice to meet you!</Output>}
			{changedText && <Output>Changed!</Output>}
			<button onClick={changeTextHandler}>Change Text!</button>
		</>
	);
};

export default Greetings;

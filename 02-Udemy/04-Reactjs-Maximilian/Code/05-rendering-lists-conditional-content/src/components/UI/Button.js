import React from "react";

const Button = props => {
	return <button type={props.whatever}>{props.children}</button>;
};

export default Button;

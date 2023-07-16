import React from "react";
import "./Card.css";

// JavaScript function
const Card = props => {
	const classes = "card " + props.className;

	return <div className={classes}>{props.children}</div>;
};

export default Card;

import React, { Component } from "react";

import classes from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = { hasError: false };
	}

	componentDidCatch(error) {
		console.log(error);
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <p className={classes.error}>Something went wrong!</p>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;

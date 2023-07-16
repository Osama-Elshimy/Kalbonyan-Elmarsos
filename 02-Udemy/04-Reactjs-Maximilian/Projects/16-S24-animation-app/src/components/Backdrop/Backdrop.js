import React from "react";
import { Transition } from "react-transition-group";

import "./Backdrop.css";

const backdrop = props => {
	return (
		<Transition mountOnEnter unmountOnExit in={props.show} timeout={400}>
			{state => {
				const cssClasses = [
					"Backdrop",
					state === "entering"
						? "BackdropOpen"
						: state === "exiting"
						? "BackdropClosed"
						: null,
				];

				return <div className={cssClasses.join(" ")} />;
			}}
		</Transition>
	);
};

export default backdrop;

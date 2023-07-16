import React from "react";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";

const modal = props => {
	return (
		<CSSTransition
			mountOnEnter
			unmountOnExit
			in={props.show}
			timeout={400}
			classNames={{
				enter: "",
				enterActive: "ModalOpen",
				exit: "",
				exitActive: "ModalClosed",
			}}>
			<div className="Modal">
				<h1>A Modal</h1>
				<button className="Button" onClick={props.closed}>
					Dismiss
				</button>
			</div>
		</CSSTransition>
	);
};

export default modal;

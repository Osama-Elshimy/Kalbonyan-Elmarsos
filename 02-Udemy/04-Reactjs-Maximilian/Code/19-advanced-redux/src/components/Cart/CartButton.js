import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../store/ui-slice";

import classes from "./CartButton.module.css";

const CartButton = props => {
	const dispatch = useDispatch();
	const cartQuntity = useSelector(state => state.cart.totalQuantity);

	const toggleCartHandler = function () {
		dispatch(uiActions.toggle());
	};

	return (
		<button className={classes.button} onClick={toggleCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{cartQuntity}</span>
		</button>
	);
};

export default CartButton;

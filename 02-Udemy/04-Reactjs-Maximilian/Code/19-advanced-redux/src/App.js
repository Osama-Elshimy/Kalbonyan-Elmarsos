import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notifcation from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const showCart = useSelector(state => state.ui.cartIsVisible);
	const cart = useSelector(state => state.cart);
	const notification = useSelector(state => state.ui.notification);

	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		// In order to block sending the data when the application is first started
		if (isInitial) {
			isInitial = false;
			return;
		}

		// Send data to the server only if it's modified after the application is started
		if (cart.changed) dispatch(sendCartData(cart));
	}, [cart, dispatch]);

	return (
		<Fragment>
			{notification && (
				<Notifcation
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;

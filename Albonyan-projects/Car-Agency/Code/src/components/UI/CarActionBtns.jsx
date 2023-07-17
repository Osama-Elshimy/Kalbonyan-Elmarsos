import classes from './CarActionBtns.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from './../../store/cartSlice';

const CarActionBtns = ({ car }) => {
	const dispatch = useDispatch();
	const carCount = useSelector(state => state.cart.cars[car.id]);

	const addToCartHandler = () => {
		dispatch(addToCart(car));
	};

	const removeFromCartHandler = () => {
		dispatch(removeFromCart(car.id));
	};

	return (
		<div className={classes['slider__item-btns']}>
			<button className={classes.button__minus} onClick={removeFromCartHandler}>
				-
			</button>
			<p>{carCount}</p>
			<button className={classes.button__plus} onClick={addToCartHandler}>
				+
			</button>
		</div>
	);
};

export default CarActionBtns;

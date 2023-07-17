import { useState, useEffect } from 'react';

import CartModal from './CartModal';

import classes from './Navbar.module.css';

const NavBar = () => {
	const [navIsOpen, setNavIsOpen] = useState(false);
	const [isSticky, setSticky] = useState(false);

	const cartClickHandler = () => {
		setNavIsOpen(false);
	};

	const navClickHandler = () => {
		setNavIsOpen(prev => !prev);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', () => handleScroll);
		};
	}, []);

	const handleScroll = () => {
		if (window.pageYOffset > 200) {
			setSticky(true);
		} else {
			setSticky(false);
		}
	};

	return (
		<nav
			id='nav'
			className={
				isSticky
					? `${classes['nav']} ${classes['nav--sticky']}`
					: `${classes['nav']}`
			}>
			<div className={classes['nav__logo-container']}>
				<strong>Your</strong>Car
			</div>
			<div className={classes['nav__menu-container']}>
				<ul
					className={
						navIsOpen
							? `${classes['nav__list']} ${classes['nav__list--active']}`
							: classes['nav__list']
					}>
					{['home', 'about', 'services', 'cars'].map(item => {
						return (
							<li key={item + '-link'} className={classes['nav__item']}>
								<a href={`#${item}`} onClick={navClickHandler}>
									{item}
								</a>
							</li>
						);
					})}
					<li key={'contact-us' + '-link'} className={classes['nav__item']}>
						<a href={'#contact-us'} onClick={navClickHandler}>
							Contact us
						</a>
					</li>
				</ul>

				<CartModal onCartClick={cartClickHandler} />
				<button className={classes['nav__menu-btn']} onClick={navClickHandler}>
					<svg
						width='24'
						height='16'
						viewBox='0 0 24 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M0 16H24V13.3333H0V16ZM0 9.33333H24V6.66667H0V9.33333ZM0 0V2.66667H24V0H0Z'
							fill='#1F2430'
						/>
					</svg>
				</button>
			</div>
		</nav>
	);
};

export default NavBar;

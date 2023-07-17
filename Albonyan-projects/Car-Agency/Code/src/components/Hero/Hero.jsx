import React from 'react';

import NavBar from '../NavBar/NavBar';

import classes from './Hero.module.css';

const Hero = () => {
	return (
		<section className={classes.hero} id='hero'>
			<NavBar />
			<div id='home' className={classes['hero__text-box']}>
				<h1 className={classes.hero__title}>
					Find the perfect car for you at YourCar.
				</h1>
				<h2 className={classes.hero__subtitle}>
					We offer a wide range of cars that cater to your needs and budget.
					Visit us today and drive away with your dream car!
				</h2>

				<button className={classes.hero__button}>
					<p>Discover </p>
					<svg
						width='16'
						height='17'
						viewBox='0 0 16 17'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M15 1.5L1 15.5M3.33333 1.5H15V13.1667'
							stroke='white'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
				</button>
			</div>
		</section>
	);
};

export default Hero;

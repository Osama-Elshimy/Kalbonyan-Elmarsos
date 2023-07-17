import React from 'react';

import main from '../assets/images/main.svg';

import Wrapper from '../assets/wrappers/LandingPage';

import { Logo } from '../components';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						job <span>tracking</span> app
					</h1>
					<p>
						lorem ipsum dolor sit amet consectetur adipisicing elit.
						Quisquam,quidem. lorem ipsum dolor sit amet consectetur adipisicing
						elit. Quisquam,quidem. lorem ipsum dolor sit amet consectetur
						adipisicing elit. Quisquam,quidem.
					</p>
					<button className='btn btn-hero'>Login/Register</button>
				</div>
				<img src={main} alt='job hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
};

export default Landing;

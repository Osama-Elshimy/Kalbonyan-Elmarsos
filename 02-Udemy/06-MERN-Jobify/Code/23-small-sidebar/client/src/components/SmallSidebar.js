import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

import { useAppContext } from '../context/appContext';

import links from '../utils/links';
import Logo from './Logo';

import Wrapper from '../assets/wrappers/SmallSidebar';

const SmallSidebar = () => {
	const { showSidebar, toggleSidebar } = useAppContext();

	return (
		<Wrapper>
			<div
				className={
					showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
				}>
				<div className='content'>
					<button className='close-btn' onClick={toggleSidebar}>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>
					<div className='nav-links'>
						{links.map(link => {
							const { id, text, path, icon } = link;
							return (
								<NavLink
									key={id}
									to={path}
									onClick={toggleSidebar}
									className={({ isActive }) =>
										isActive ? 'nav-link active' : 'nav-link'
									}>
									<span className='icon'>{icon}</span>
									{text}
								</NavLink>
							);
						})}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default SmallSidebar;

import React, { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

import { useAppContext } from '../context/appContext';

import Logo from './Logo';
import Wrapper from '../assets/wrappers/Navbar';

const Navbar = () => {
	const { user, logoutUser, toggleSidebar } = useAppContext();

	const [showLogout, setShowLogout] = useState(false);

	return (
		<Wrapper>
			<div className='nav-center'>
				<button type='button' className='toggle-btn' onClick={toggleSidebar}>
					<FaAlignLeft />
				</button>

				<div>
					<Logo />
					<h3 className='logo-text'>dashboard</h3>
				</div>

				<div className='btn-container' type='button'>
					<button
						className='btn'
						onClick={() => {
							setShowLogout(!showLogout);
						}}>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>
					<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
						<button className='dropdown-btn' onClick={logoutUser}>
							logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Navbar;

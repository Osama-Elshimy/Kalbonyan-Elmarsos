import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import { Navbar, SmallSidebar, BigSidebar } from '../../components';
import Wrapper from '../../assets/wrappers/SharedLayout';

const SharedLayout = () => {
	return (
		<Wrapper>
			<main className='dashboard'>
				<SmallSidebar />
				<BigSidebar />
				<div>
					<Navbar />
					<div className='dashboard-page'>
						<Outlet />
					</div>
				</div>
				<Outlet />
			</main>
		</Wrapper>
	);
};

export default SharedLayout;

import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';

const ProtectedRoute = ({ children }) => {
	const { user, userLoading } = useAppContext();

	if (userLoading) return <Loading />;

	return user ? children : <Navigate to='/landing' />;
};

export default ProtectedRoute;

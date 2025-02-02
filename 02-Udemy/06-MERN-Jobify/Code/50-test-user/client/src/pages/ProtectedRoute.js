import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppContext } from '../context/appContext';

const ProtectedRoute = ({ children }) => {
	const { user } = useAppContext();

	return user ? children : <Navigate to='/landing' />;
};

export default ProtectedRoute;

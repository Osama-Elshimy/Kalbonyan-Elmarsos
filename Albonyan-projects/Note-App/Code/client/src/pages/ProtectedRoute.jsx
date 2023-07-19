import { Navigate } from 'react-router-dom';

import { useAppContext } from '../context/appContext';

const ProtectedRoute = ({ children }) => {
	const { user } = useAppContext();

	return user ? children : <Navigate to='/register' />;
};

export default ProtectedRoute;

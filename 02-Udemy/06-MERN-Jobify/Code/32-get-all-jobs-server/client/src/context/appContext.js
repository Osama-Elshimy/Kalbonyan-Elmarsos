import React, { useReducer, useContext, createContext } from 'react';
import axios from 'axios';

import reducer from './reducer';

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_ERROR,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: user ? JSON.parse(user) : null,
	token: token,
	userLocation: userLocation || '',
	showSidebar: false,

	isEditing: false,
	editJobId: '',
	position: '',
	company: '',
	jobLocation: userLocation || '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
	jobType: 'full-time',
	statusOptions: ['pending', 'interview', 'declined'],
	status: 'pending',
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const authFetch = axios.create({
		baseURL: '/api/v1',
	});

	authFetch.interceptors.request.use(
		function (config) {
			config.headers['Authorization'] = `Bearer ${state.token}`;
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);

	authFetch.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			if (error.response.status === 401) logoutUser();

			return Promise.reject(error);
		}
	);

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, 3000);
	};

	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('token', token);
		localStorage.setItem('location', location);
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('location');
	};

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN });

		try {
			const response = await axios.post(
				`/api/v1/auth/${endPoint}`,
				currentUser
			);
			const { user, token, location } = response.data;

			dispatch({
				type: SETUP_USER_SUCCESS,
				payload: { user, token, location, alertText },
			});

			addUserToLocalStorage({ user, token, location });
		} catch (error) {
			dispatch({
				type: SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}

		clearAlert();
	};

	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR });
	};

	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER });
		removeUserFromLocalStorage();
	};

	const updateUser = async currentUser => {
		dispatch({ type: UPDATE_USER_BEGIN });

		try {
			const { data } = await authFetch.patch('/auth/updateUser', currentUser);

			const { user, location, token } = data;

			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, location, token },
			});

			addUserToLocalStorage({ user, location, token });
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				});
			}
		}

		clearAlert();
	};

	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
	};

	const clearValues = () => {
		dispatch({ type: CLEAR_VALUES });
	};

	const createJob = async () => {
		dispatch({ type: CREATE_JOB_BEGIN });

		try {
			const { position, company, jobLocation, jobType, status } = state;

			await authFetch.post('/jobs', {
				position,
				company,
				jobLocation,
				jobType,
				status,
			});

			dispatch({
				type: CREATE_JOB_SUCCESS,
			});

			clearValues();
		} catch (error) {
			if (error.response.status === 401) return;

			dispatch({
				type: CREATE_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}

		clearAlert();
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				toggleSidebar,
				setupUser,
				logoutUser,
				updateUser,
				handleChange,
				clearValues,
				createJob,
			}}>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };

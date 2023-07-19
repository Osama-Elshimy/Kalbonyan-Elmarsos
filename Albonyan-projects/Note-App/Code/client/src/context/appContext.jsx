import { useReducer, useContext, createContext, useState } from 'react';
import axios from 'axios';

const URL = '/api/v1';
import reducer from './reducer';

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	LOGOUT_USER,
	PASSWORD_MISMATCH,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	OPEN_MODAL,
	CLOSE_MODAL,
	TOGGLE_DARK_MODE,
	GET_NOTES_BEGIN,
	GET_NOTES_SUCCESS,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const darkMode = localStorage.getItem('darkMode');

const initialState = {
	user: user ? JSON.parse(user) : null,
	token: token,
	isLoaing: false,
	userLoading: true,
	showAlert: false,
	alertText: '',
	alertType: '',

	isModalOpen: false,
	isDarkMode: darkMode ? JSON.parse(darkMode) : 'false',

	notes: [],
	totalActiveNotes: 0,
	language: localStorage.getItem('language') || 'en',
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const authFetch = axios.create({
		baseURL: URL,
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

	const addUserToLocalStorage = ({ user, token }) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('token', token);
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	};

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN });

		try {
			const response = await axios.post(`${URL}/auth/${endPoint}`, currentUser);
			const { user, token } = response.data;

			dispatch({
				type: SETUP_USER_SUCCESS,
				payload: { user, token, alertText },
			});

			addUserToLocalStorage({ user, token });
		} catch (error) {
			dispatch({
				type: SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}

		clearAlert();
	};

	const passwordMismatch = () => {
		dispatch({ type: PASSWORD_MISMATCH });
		clearAlert();
	};

	const logoutUser = async () => {
		dispatch({ type: LOGOUT_USER });
		removeUserFromLocalStorage();
	};

	const updateUser = async currentUser => {
		dispatch({ type: UPDATE_USER_BEGIN });

		try {
			const { data } = await authFetch.patch('/auth/updateUser', currentUser);

			const { user, token } = data;

			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, token },
			});

			addUserToLocalStorage({ user, token });
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

	const openModal = () => {
		dispatch({ type: OPEN_MODAL });
	};

	const closeModal = () => {
		dispatch({ type: CLOSE_MODAL });
	};

	const toggleDarkMode = () => {
		const updatedDarkMode = !state.isDarkMode;
		dispatch({ type: TOGGLE_DARK_MODE });

		localStorage.setItem('darkMode', JSON.stringify(updatedDarkMode));
	};

	const fetchNotes = async () => {
		dispatch({ type: GET_NOTES_BEGIN });

		try {
			const { data } = await authFetch.get('/notes');

			dispatch({
				type: GET_NOTES_SUCCESS,
				payload: { notes: data },
			});
		} catch (error) {
			console.error('Error fetching notes:', error);
			logoutUser();
		}
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				setupUser,
				passwordMismatch,
				logoutUser,
				updateUser,
				openModal,
				closeModal,
				toggleDarkMode,
				authFetch,
				fetchNotes,
			}}>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };

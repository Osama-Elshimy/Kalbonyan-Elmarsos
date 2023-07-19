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

import { initialState } from './appContext';

const reducer = (state, action) => {
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: 'Please provide all values!',
		};
	}

	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: '',
			alertText: '',
		};
	}

	if (action.type === SETUP_USER_BEGIN) {
		return { ...state, isLoading: true };
	}

	if (action.type === SETUP_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			token: action.payload.token,
			user: action.payload.user,
			showAlert: true,
			alertType: 'success',
			alertText: action.payload.alertText,
		};
	}

	if (action.type === SETUP_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		};
	}

	if (action.type === PASSWORD_MISMATCH) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: 'Passwords do not match',
		};
	}

	if (action.type === LOGOUT_USER) {
		return {
			...initialState,
			token: null,
			user: null,
		};
	}

	if (action.type === UPDATE_USER_BEGIN) {
		return { ...state, isLoading: true };
	}

	if (action.type === UPDATE_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			token: action.payload.token,
			user: action.payload.user,
			showAlert: true,
			alertType: 'success',
			alertText: 'User Profile Updated!',
		};
	}

	if (action.type === UPDATE_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		};
	}

	if (action.type === OPEN_MODAL) {
		return {
			...state,
			isModalOpen: true,
		};
	}

	if (action.type === CLOSE_MODAL) {
		return {
			...state,
			isModalOpen: false,
		};
	}

	if (action.type === TOGGLE_DARK_MODE) {
		return {
			...state,
			isDarkMode: !state.isDarkMode,
		};
	}

	if (action.type === GET_NOTES_BEGIN) {
		return { ...state, isLoading: true, showAlert: false };
	}

	if (action.type === GET_NOTES_SUCCESS) {
		return {
			...state,
			isLoading: false,
			notes: action.payload.notes,
		};
	}

	throw new Error(`No such action: ${action.type}`);
};

export default reducer;

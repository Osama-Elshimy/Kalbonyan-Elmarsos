import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { loadCartState } from './store/cartSlice';
import rootReducer from './store/reducers';

const store = configureStore({
	reducer: rootReducer,
	middleware: [thunk],
});

// Load cart state from local storage
store.dispatch(loadCartState());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

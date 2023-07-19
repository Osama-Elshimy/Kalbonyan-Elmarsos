import React from 'react';
import ReactDOM from 'react-dom/client';

import './i18n';
import App from './App';
import './style/style.scss';

import { AppProvider } from './context/appContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>
);

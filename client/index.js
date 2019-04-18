import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import axios from 'axios';
import webConfig from '../config/web-config.json';
import appRoutes from './routes';
import reducers from './reducers';

const axiosInstance = axios.create({
	baseURL: webConfig.api_baseURL,
});

const store = createStore(
	reducers,
	window.INITIAL_STATE,
	applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			{appRoutes()}
		</BrowserRouter>
	</Provider>,

	document.querySelector('#root')
);
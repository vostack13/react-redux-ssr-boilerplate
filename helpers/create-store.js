import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import webConfig from '../config/web-config';
import reducers from '../client/reducers';

export default (req) => {
	const axiosInstance = axios.create({
		baseURL: webConfig.api_baseURL,

		headers: {
			cookie: req.get('cookie') || '',
		}
	});

	const store = createStore(
		reducers,
		{},
		applyMiddleware(thunk.withExtraArgument(axiosInstance)
	));

	return store;
}
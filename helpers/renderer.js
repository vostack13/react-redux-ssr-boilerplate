import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../client/routes';
import webConfig from '../config/web-config';

export default (req, store, context) => {
	const content = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.path} context={context}> 
				<div>{renderRoutes(Routes)}</div>
			</ StaticRouter>
		</Provider>
	);

	const helmet = Helmet.renderStatic();

	return `<html lang="en">
		<head>
			<meta charset="UTF-8">
			${helmet.meta.toString()}
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<meta http-equiv="X-UA-Compatible" content="ie=edge">
			${helmet.title.toString()}
			<link rel="shortcut icon" href="${webConfig.site_URL}/assets/static-assets/favicon.ico">
			<link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
		</head>
		<body ${helmet.bodyAttributes.toString()}>
			<div id="root">${content}</div>
			<script>
				window.INITIAL_STATE = ${serialize(store.getState())}
			</script>
			<script src="${webConfig.site_URL}/client_bundle.js"></script>
		</body>
	</html>`;
};


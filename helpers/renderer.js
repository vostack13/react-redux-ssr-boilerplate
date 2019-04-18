import React from 'react';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import webConfig from '../config/web-config';

export default ({store, content}) => {
	const helmet = Helmet.renderStatic();

	return <html lang="en" {...helmet.htmlAttributes.toComponent()}>
		<head dangerouslySetInnerHTML={{
			__html: `
				${helmet.title.toString()}
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				${helmet.meta.toString()}
				<link rel="shortcut icon" href="${webConfig.siteURL}/assets/graphics/favicon.ico">
			`}}></head>

		<body {...helmet.bodyAttributes.toComponent()}>
			<div id="root" dangerouslySetInnerHTML={{ __html: content }} />

			<script dangerouslySetInnerHTML={{
				__html: `window.INITIAL_STATE = ${serialize(store.getState())}`,
			}} />

			<script src={`${webConfig.site_URL}/client_bundle.js`}></script>
		</body>
	</html>
};

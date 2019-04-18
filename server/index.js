import '@babel/polyfill';
import express from 'express';
import React from 'react';
import HTML from '../helpers/renderer';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from '../helpers/create-store';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import appRoutes from '../client/routes';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('build/public'));

app.use((err, req, res, next) => {
	console.error(err.message);
	res.status(500).send('Something went wrong.');
});

app.get(['/*/:param', '*'], (req, res) => {
		const store = createStore(req);
		const context = {};

		const content = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.path} context={context}> 
					{appRoutes()}
				</StaticRouter>
			</Provider>
		);

		const html = <HTML store={store} content={content} />;

		res.send(`<!DOCTYPE html>\n${renderToStaticMarkup(html)}`);
		res.end();
	});

app.listen(port, () => {
	console.log(`Running on Port ${port}`);
});
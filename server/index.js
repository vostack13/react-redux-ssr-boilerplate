import '@babel/polyfill';
import { matchRoutes } from 'react-router-config';
import express from 'express';
import Routes from '../client/routes';
import renderer from '../helpers/renderer';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('build/public'));

app.use((err, req, res, next) => {
	console.error(err.message);
	res.status(500).send('Something went wrong.');
});

app.get(['/*/:param', '*'], (req, res) => {
	const ParamValue = req.params.param ? req.params.param : null;
	const store = createStore(req);

	const promises = matchRoutes(Routes, req.path)
		.map(({ route }) => route.loadData
			? route.loadData(store, ParamValue)
			: null
		)
		.map(promise => {
			if(promise)
				return new Promise((resolve, rejects) => {
					promise
						.then(resolve)
						.catch(resolve)
				});
		});
	
	Promise
		.all(promises)
		.then(() => {
			const context = {};
			const content = renderer(req, store, context);

			if(context.url)
				return res.redirect(301, context.url);

			if(context.notFound)
				res.status(404);

			res.send(content);
		})
});

app.listen(port, () => {
	console.log(`Running on Port ${port}`);
});
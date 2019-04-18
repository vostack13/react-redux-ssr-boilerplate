const path = require('path');
const webConfig = require('./web-config.json');

module.exports = {
	mode: webConfig.environment,
	entry: ['@babel/polyfill','./client/index.js'],

	output: {
		filename: 'client_bundle.js',
		path: path.resolve(__dirname, '../build/public'),
		publicPath: '../'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query : require('./babel'),
			},
		]
	},
};
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webConfig = require('./web-config.json');

module.exports = {
	mode: webConfig.environment,
	target: 'node',
	entry: './server/index.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../build'),
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
	
	externals: [nodeExternals()],
};
const path = require("path");
module.exports = {
	entry: {
		"index": "./src/js/index.jsx",
	},
	output: {
		path: path.resolve("assets/js"),
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{ loader: "style-loader" }, { loader: "css-loader" }]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				loader: 'url-loader',
				options: {
					// Images larger than 10 KB won’t be inlined
					limit: 10 * 1024
				}
			},
			{
				test: /\.svg$/,
				loader: 'svg-url-loader',
				options: {
					// Images larger than 10 KB won’t be inlined
					limit: 10 * 1024,
					noquotes: true,
				}
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				loader: 'image-webpack-loader',
				enforce: 'pre'
			}
		]
	}
};

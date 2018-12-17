const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "production",
	entry: ["babel-polyfill", "./src/index.js"],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "docs")
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|jpg|gif|mp3|svg|wav)$/,
				use: [
					{
						loader: "file-loader"
					}
				]
			}
		]
	},
	devServer: {
		contentBase: "./docs"
	},
	plugins: [
		new CleanWebpackPlugin(["docs"]),
		new HtmlWebpackPlugin({ template: "./src/index.html" }),
		new CopyWebpackPlugin([{ from: "src/static", to: "static" }])
	],
	node: {
		fs: "empty"
	}
};

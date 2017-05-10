var glob = require('glob');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

// Required for Create React App Babel transform
process.env.NODE_ENV = 'production';

module.exports = {
	// Use all js files in project root (except
	// the webpack config) as an entry
	entry: globEntries('!(webpack.config).js'),
	target: 'node',
	externals:[nodeExternals()],
	module:{
		loaders:[{
			test:/\.js$/,
			loaders:['babel'],
			include: __dirname,
			exclude: /node_modules/,
		}]
	},
	// We are going to create multiple APIs in this guide, and we are 
	// going to create a js file to for each, we need this output block
	output:{
		libraryTarget:'commonjs',
		path:path.join(__dirname, '.webpack'),
		filename:'[name].js'
	},
};

function globEntries(globPath){
	var files = glob.sync(globPath);
	var entries = {};

	for(var i=0; i<files.length;i++){
		var entry = files[i];
		entries[path.basename(entry, path.extname(entry))] = './' + entry;
	}
	console.log(entries);
	return entries;
}

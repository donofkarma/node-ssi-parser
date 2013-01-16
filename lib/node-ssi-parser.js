/*global require:true, exports:true, module:true, window:true */

(function () {

	'use strict';

	function ssiParser(filename, source) {
		var fs = require('fs'),
			path = require('path'),
			filePath = path.dirname(filename) + '/',
			parsed = source;

		/**
		* read file
		**/
		// passed in as source

		/**
		* parse SSIs
		**/
		/** #include **/
		parsed = source.replace(/<!--#include virtual="(.+)" -->/g, function(match, includePath) {
			return ssiParser(filePath + includePath, fs.readFileSync(filePath + includePath, 'utf8'));
		});

		/**
		* return expanded data
		*/
		return parsed;
	}

	// export node.js module
	module.exports = exports = ssiParser;
}());
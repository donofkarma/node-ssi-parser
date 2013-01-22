/*global require:true, exports:true, module:true, window:true */

(function () {

	'use strict';

	var vars = {};

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
		parsed = source.replace(/<!--#include virtual="(.*?)" -->/g, function(match, includePath) {
			// recursive as included files may include others
			return ssiParser(filePath + includePath, fs.readFileSync(filePath + includePath, 'utf8'));
		});
		/** vars - saving **/
		parsed = parsed.replace(/<!--#set var="(.*?)" value="(.*?)" -->/g, function(match, key, value) {
			vars[key] = value;
			return '';
		});
		/** vars - echo **/
		parsed = parsed.replace(/<!--#echo var="(.*?)" -->/g, function(match, key) {
			return vars[key];
		});

		/**
		* return expanded data
		*/
		return parsed;
	}

	// export node.js module
	module.exports = exports = ssiParser;
}());
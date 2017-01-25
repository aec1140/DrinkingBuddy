/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new empty object literal
var app = app || {};


window.onload = function(){
	console.log("window.onload called");
	app.main.init();

	// do not display page unless terms are accepted
	document.getElementById("accept").onsubmit = function() {
		if (!document.getElementById("agree").checked) return false; // break out if they did not accept
		document.getElementById("content").style.visibility = "visible";
		document.getElementById("accept").style.display = "none";
		return false;
	};
};
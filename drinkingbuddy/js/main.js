// main.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

/*
 .main is an object literal that is a property of the app global
 This object literal has its own properties and methods (functions)
 
 */
app.main = {
	// properties
	BASE_URL : "https://addb.absolutdrinks.com/",
	BASE_ASSET : "https://assets.absolutdrinks.com/drinks/",
	ID : "?appId=11042&callback=",

	totalResult : undefined, // will be set upon init
	debug : true,
	searchBox : undefined,
	contentIndex : 1,

	map : undefined,
	infowindow : undefined,

	// methods
	init : function() {
		if (this.debug) console.log("initializing");

		this.displayHome();
		this.searchBox = document.getElementById("searchForm");

		// store max total amount of drinks
		this.url = this.BASE_URL + "drinks/" + this.ID + "getTotalResult";
		loadData(this.url, getTotalResult, this);

		// hook up events
		this.searchBox.onsubmit = this.search.bind(this);
		document.getElementById("restock").onclick = this.displayMap.bind(this);
		document.getElementById("home").onclick = this.displayHome.bind(this);
		this.hookupFilters();
	},

	// gets random drink
	getRandomDrink : function() {
		var randIndex = Math.floor(Math.random() * this.totalResult);

		this.url = this.BASE_URL + "drinks/" + this.ID + "getDrinks";
		this.url += "&start=" + randIndex + "&pageSize=1";

		loadData(this.url,getDrinks,this);
	},

	// search string function
	search : function(e) {
		e.preventDefault();

		var searchStr = document.getElementById("search").value;

		if (this.debug) console.log("Searching For : " + searchStr);

		this.url = this.BASE_URL + "quickSearch/drinks/";
		this.url += searchStr;
		this.url += this.ID + "getDrinks";

		loadData(this.url,getDrinks,this);
	},

	// search by ingredient
	searchByIngredient : function(e) {

		this.url = this.BASE_URL + "/drinks/withtype/";
		this.url += e.target.id + "/";
		this.url += this.ID + "getDrinks";

		loadData(this.url,getDrinks,this);
	},

	// search by taste
	searchByTaste : function(e) {

		this.url = this.BASE_URL + "/drinks/tasting/";
		this.url += e.target.id + "/";
		this.url += this.ID + "getDrinks";

		loadData(this.url,getDrinks,this);
	},

	// search by color
	searchByColor : function(e) {

		this.url = this.BASE_URL + "/drinks/colored/";
		this.url += e.target.id + "/";
		this.url += this.ID + "getDrinks";

		loadData(this.url,getDrinks,this);
	},

	// create links for dynamic drinks
	makeLinks : function() {
		var links = document.getElementsByClassName("result");

		for (var i = 0; i < links.length; ++i) {
			var drinkId = links[i].id;

			this.url = this.BASE_URL + "drinks/" + drinkId + "/" + this.ID + "getDrinks";
			links[i].onclick = loadData.bind(this,this.url,getDrinks,this);
		}
	},

	// home button callback
	displayHome : function() {
		var map = document.getElementById("map");
		map.style.display = "none";

		document.getElementById("searchBox").style.display = "block";
		document.getElementById("dynamicContent").style.display = "block";
	},

	// restock button callback
	displayMap : function() {
		var map = document.getElementById("map");
		map.style.display = "block";
		map.style.width = "100%";
		map.style.height = "500px";

		initMap();

		document.getElementById("searchBox").style.display = "none";
		document.getElementById("dynamicContent").style.display = "none";
	},

	// hook-up filter buttons to correct search function
	hookupFilters : function() {
		var spirits = document.getElementsByClassName("spirits");
		for (var i = 0; i < spirits.length; ++i) {
			spirits[i].onclick = this.searchByIngredient.bind(this);
		}

		var taste = document.getElementsByClassName("taste");
		for (var i = 0; i < taste.length; ++i) {
			taste[i].onclick = this.searchByTaste.bind(this);
		}

		var color = document.getElementsByClassName("color");
		for (var i = 0; i < color.length; ++i) {
			color[i].onclick = this.searchByColor.bind(this);
		}
	},
};

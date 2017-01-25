function checkForErrors(obj) {
	// if there's an error, print a message and return
	if(obj.error){
	  var status = obj.status;
	  var description = obj.description;
	  console.log("ERROR: " + status + description);
	  return true; // Bail out
	}

	// if there are no results, print a message and return
	if(obj.total_items == 0){
		console.log("ERROR: No results found!")
	  return true; // Bail out
	}
	return false
}

function changeDrinkContent(str) {
	document.querySelector("#dynamicDrink").innerHTML = str;
	$("#dynamicDrink").fadeIn(500);
}

function changeDrinksContent(str) {
	document.querySelector("#dynamicDrinks").innerHTML = str;
	$("#dynamicDrinks").fadeIn(500);
}

function loadData(url,callback,ctx) {
	// call the web service, and download the file
	if (this.debug) console.log("loading " + url);

	$.ajax({
	  dataType: "jsonp",
	  url: url,
	  context: ctx,
	  data: null,
	  success: callback
	});
}

// get total amount of results for use with get random drink
function getTotalResult(obj) {
	if (checkForErrors(obj)) return; // bail out if error	

	if (this.debug) console.log("Setting totalResult to : " + obj.totalResult);
	this.totalResult = obj.totalResult;
	this.getRandomDrink();
}

// displays a single drink
function displayDrink(drink) {
	var name = drink.name;
	var img = this.BASE_ASSET + "255x350/" + drink.id + ".png";
	var description = drink.description;

	var line = "<div class=drink>";
	line += "<img src='" + img + "'>";
	line += "<h2 style='text-align:center'>" + name + "</h2>";
	line += "<p class='blocktext'><b>Ingredients:</b><br>";
	drink.ingredients.forEach(function(ingredient){
		line += ingredient.textPlain + "<br>";
	});
	line += "<small><i>" + drink.descriptionPlain + "</i></small></p>";
	line += "</div>";

	changeDrinkContent(line);

	// http://stackoverflow.com/questions/4096863/how-to-get-and-set-the-current-web-page-scroll-position
	$("html, body").animate({ scrollTop: "200px" });
}

// displays multiple drinks
function displayDrinks(drinks) {
	var bigString = "<div class=myContentResults id='results'>"

	for (var i = 0; i < drinks.length; ++i) {
		var drink = drinks[i];
		var name = drink.name;
		var img = this.BASE_ASSET + "150x150/" + drink.id + ".png";

		var line = "<div class=result style='float:left; cursor:pointer' id ='" + drink.id + "''>";
		line += "<img src='" + img + "' align='middle'>";
		line += "<h4 style='text-align:center'>" + name + "</h4>";
		line += "</div>";

		bigString += line;
	}

	bigString += "</div>";

	changeDrinksContent(bigString);
	this.makeLinks();
	$("html, body").animate({ scrollTop: "850px" });
}

// looks at drink object and calls correct draw function
function getDrinks(obj) {
	if (checkForErrors(obj)) return; // bail out if error	

	if (this.debug) {
		console.log("obj = " + obj);
		console.log("obj stringified = " + JSON.stringify(obj));
	}

	// called after drinks loaded
	// If there is an array of results, loop through them
	var allDrinks = obj.result;

	if (allDrinks.length == 1) {
		displayDrink.call(this,allDrinks[0]);
	}
	else {
		displayDrinks.call(this,allDrinks);
	}
}
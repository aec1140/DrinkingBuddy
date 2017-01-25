// Main map file for loading and creating map

var map;
var infowindow;
var pos;
var inner;

// initialize map
function initMap() {
  pos = {lat: -33.867, lng: 151.195};
  
  geoFindMe();
}

// gets users location
function geoFindMe() {
  inner = document.getElementById("map").innerHTML;

  if (!navigator.geolocation){
    inner.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    createMap();
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    pos.lat = latitude;
    pos.lng = longitude;

    createMap();
  }

  function error() {
    inner.innerHTML = "Unable to retrieve your location";
    createMap();
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

// creates map after location is found
function createMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pos,
    radius: 1000,
    type: ['liquor_store']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      addMarker(results[i].geometry.location, results[i].name, results[i].vicinity);
    }
  }
}

function addMarker(location, title, address) {
  var marker = new google.maps.Marker({position:location, map:map});

  // add a listener for the click event
  google.maps.event.addListener(marker,'click',function(e){
    makeInfoWindow(location,title,address);
  });

}

function makeInfoWindow(position, name, address) {
  // close old window if exist
  if (infoWindow) infoWindow.close();

  // make a new window
  infoWindow = new google.maps.InfoWindow({
    map: map,
    position: position,
    content: "<b>" + name + "</b><br><i>" + address + "</i>"
  });
} 

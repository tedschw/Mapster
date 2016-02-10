/* normally would call app.initialize() here, but now triggering it from maps api callback */
function init(){
    app.initialize();
}

var app = {
    // Application Constructor
    initialize: function() {
	// this.bindEvents();
	this.receivedEvent('deviceready');
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
	console.log("message received");
	app.initMap();
    },
    addMarkersToMap: function(map){    
	var latitudeAndLongitudeOne = new google.maps.LatLng('42.359','-71.056');
 
	var markerOne = new google.maps.Marker({
		position: latitudeAndLongitudeOne,
		map: map
	    });
 
	var latitudeAndLongitudeTwo = new google.maps.LatLng('42.354', '-71.069');
 
	var markerTwo = new google.maps.Marker({
		position: latitudeAndLongitudeTwo,
		map: map
	    });

	/* placeholder for service call to get coordinates of other locations */
	setInterval(function(){
		var lat1 = markerOne.getPosition().lat()+.0001;
                var lng1 = markerOne.getPosition().lng();        
                var newcoordinate = new google.maps.LatLng(lat1, lng1);
		markerOne.setPosition(newcoordinate);

                var lat2 = markerTwo.getPosition().lat()-.0001;
                var lng2 = markerTwo.getPosition().lng()-.0001;        
                newcoordinate = new google.maps.LatLng(lat2, lng2);
		markerTwo.setPosition(newcoordinate);
	    },500);
    },
    /* Note: This example requires that you consent to location sharing when
       prompted by your browser. If you see the error "The Geolocation service
       failed.", it means you probably did not give permission for the browser to
       locate you. */
    initMap: function () {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 42.358, lng: -71.058},
		zoom: 15
	    });
	var infoWindow = new google.maps.InfoWindow({map: map});

	google.maps.event.addListenerOnce(map, 'tilesloaded', fixMyPageOnce);

	function fixMyPageOnce() {
	    // do stuff
	    // no need to remove the event listener
	    console.log("map loaded");
	    app.addMarkersToMap(map);
	}

	try {
	    // Try HTML5 geolocation.
	    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
			    lat: position.coords.latitude,
			    lng: position.coords.longitude
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent('Your location');
			map.setCenter(pos);
		    }, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		    });
	    } else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	    }
	} catch (err){ 
	    console.log(err.message);
	}
    }
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
			  'Error: The Geolocation service failed.' :
			  'Error: Your browser doesn\'t support geolocation.');
}
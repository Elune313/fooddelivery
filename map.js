var map
var restaurant_marker
var runner_markers = []

function initMap() {
	var location = {lat: 39.952583, lng: -75.165222};
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 15, 
		center: location,
		mapTypeControl: false,
		fullscreenControl: false,
		streetViewControl: false,
		styles: [
			{
				"featureType": "poi",
				"stylers": [{"visibility": "off"}]
			}
		],
	});
}

function createMarker(map, markerInfo) {
	var image = {
		url: markerInfo.url,
		anchor: new google.maps.Point(27,45),
    scaledSize: markerInfo.size
	}
	var marker = new google.maps.Marker({
		map: map,
		icon: image,
		animation: google.maps.Animation.DROP,
		position: markerInfo.location,
	});

	var infoWindow = new google.maps.InfoWindow({
		content: '<h6>' + markerInfo.title + '</h6>',
	});
	marker.addListener('mouseover', function() {
		infoWindow.open(map, marker);
	});
	marker.addListener('mouseout', function() {
		infoWindow.close();
	});
	// Hide close button
	google.maps.event.addListener(infoWindow, 'domready', function() {
		$('.gm-style-iw').next().css({
			'display': 'none'
		});
	});
	return marker;
}

function updateRestaurantMarker(restaurantInfo) {
	var latLng = new google.maps.LatLng(restaurantInfo['lat'], restaurantInfo['lng']);
	map.panTo(latLng);

	if (restaurant_marker) {
		restaurant_marker.setMap(null);
	}
	restaurant_marker = createMarker(map, {
		url: '/images/restaurant_marker.svg', 
		location: latLng,
		size: new google.maps.Size(70,70),
		title: restaurantInfo.name,
	});
}

function updateRunnerMarker(result) {
	for (i = 0; i < runner_markers.length; i++) {
		runner_markers[i].setMap(null);
	}

	addMarkerForRunner(result['bike_runner'], 'bike');
	addMarkerForRunner(result['car_runner'], 'car');
}

function addMarkerForRunner(runnerArr, transportation) {
	if (runnerArr) {
		for (i = 0; i < runnerArr.length; i++) {
			var marker = createMarker(map, {
				url: transportation == 'bike'
				     ? 'https://img.icons8.com/dusk/48/000000/bicycle.png' 
				     : 'https://img.icons8.com/dusk/48/000000/fiat-500.png', 
				location: {lat: runnerArr[i]['lat'], lng: runnerArr[i]['lng']},
				size: new google.maps.Size(50,50),
				title: 'test'
			});
			runner_markers.push(marker);
		}
	}
}
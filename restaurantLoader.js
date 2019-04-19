loadRestaurant();

function loadRestaurant() {
	readFile('data/restaurant.txt', function(restaurants) {
		autocomplete(document.getElementById("restaurantInput"), restaurants, function(chosenItem) {
			$.ajax({
				url: 'getRestaurantInfo',
				type: 'POST',
				data: {
					"restaurant": chosenItem
				},
				success: function(result) {
					updateRestaurantMarker(result);
				},
			});
		});
	});
}
loadCuisineType();

function loadCuisineType() {
	readFile('data/cuisine_type.txt', function(cuisineTypes) {
		var sel = document.getElementById("cuisineTypeSelect");
		var fragment = document.createDocumentFragment();

		cuisineTypes.forEach(function(cuisineType, index) {
			var opt = document.createElement('option');
			opt.innerHTML = cuisineType;
			opt.value = cuisineType;
			fragment.appendChild(opt);
		});

		sel.appendChild(fragment);
	});
}
function readFile(path, successHandler) {
	var rawFile = new XMLHttpRequest();
	rawFile.open('GET', path, true);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status === 0) {
				var allText = rawFile.responseText;
				successHandler(allText.split('\n'));
			}
		}
	}
	rawFile.send(null);
}

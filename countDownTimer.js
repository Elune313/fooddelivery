var timer = document.getElementById('prepTimeCountdown');

function startCountDown(startTime) {
	var timeInMillisec = startTime * 60 * 1000;
	setTimer(timeInMillisec);
	timeInMillisec -= 1000;
	var x = setInterval(function() {
		if (timeInMillisec < 0) {
			clearInterval(x)
			timer.innerHTML = "00: 00: 00";
		}
		setTimer(timeInMillisec);
		timeInMillisec -= 1000;
	}, 1000);
}

function setTimer(timeInMillisec) {
	var hours = addPaddingZero(Math.floor(timeInMillisec / (1000 * 60 * 60)));
	var mins = addPaddingZero(Math.floor((timeInMillisec % (1000 * 60 * 60)) / (1000 * 60)));
	var secs = addPaddingZero(Math.floor((timeInMillisec % (1000 * 60)) / 1000));
	timer.innerHTML = hours + ': ' + mins + ': ' + secs;
}

function addPaddingZero(num) {
	return num < 10 ? "0" + num : num;
}
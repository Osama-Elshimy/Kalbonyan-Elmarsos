const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

///////////////////////////
// Functions

// Play & Pause video
const toggleVideoStatus = function () {
	if (video.paused) video.play();
	else video.pause();
};

// Update Play & Pause icon
const updatePlayIcon = function () {
	if (video.paused) {
		play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
	} else {
		play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
	}
};

// Update Progress & Timestamp
const updateProgress = function () {
	progress.value = (video.currentTime / video.duration) * 100;

	// Get minutes
	let minutes = Math.floor(video.currentTime / 60);
	if (minutes < 10) {
		minutes = "0" + String(minutes);
	}

	// Get seconds
	let seconds = Math.floor(video.currentTime % 60);
	if (seconds < 10) {
		seconds = "0" + String(seconds);
	}

	timestamp.innerHTML = `${minutes}:${seconds}`;
};

// Set video time to progress
const setVideoProgress = function () {
	video.currentTime = (+progress.value * video.duration) / 100;
};

// Stop video
const stopVideo = function () {
	video.currentTime = 0;
	video.pause();
};

///////////////////////////
// Even Listener
// When clicking on the video
video.addEventListener("click", toggleVideoStatus);

// When the video is played or paused
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);

// When the video time is changed
video.addEventListener("timeupdate", updateProgress);

// When clicking on the play button
play.addEventListener("click", toggleVideoStatus);

// When clicking on the stop button
stop.addEventListener("click", stopVideo);

// Changing the bar progress
progress.addEventListener("change", setVideoProgress);

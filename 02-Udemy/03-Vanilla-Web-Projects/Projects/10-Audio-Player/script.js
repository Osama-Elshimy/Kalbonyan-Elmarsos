const quranContainer = document.getElementById("quran-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

///////////////////////////////////////////
// Surah titles
const surah = ["Al-Nabaa", "Al-Nazeat", "Al-Keiama"];

// Keep track of Surah
let surahIndex = 1;

// Update Surah details
const loadSurah = function (surah) {
	title.innerText = surah;
	audio.src = `Quran/${surah}.mp3`;
	cover.src = `images/${surah}.png`;
};

// Initially load Surah details into DOM
loadSurah(surah[surahIndex]);

// Play Surah
const playSurah = function () {
	quranContainer.classList.add("play");
	playBtn.querySelector("i.fas").classList.remove("fa-play");
	playBtn.querySelector("i.fas").classList.add("fa-pause");

	audio.play();
};

// Pause Surah
const pauseSurah = function () {
	quranContainer.classList.remove("play");
	playBtn.querySelector("i.fas").classList.add("fa-play");
	playBtn.querySelector("i.fas").classList.remove("fa-pause");

	audio.pause();
};

// Previous Surah
const prevSurah = function () {
	surahIndex--;

	if (surahIndex < 0) {
		surahIndex = surah.length - 1;
	}

	loadSurah(surah[surahIndex]);

	playSurah();
};

// Next surah
const nextSurah = function () {
	surahIndex++;

	if (surahIndex > surah.length - 1) {
		surahIndex = 0;
	}

	loadSurah(surah[surahIndex]);

	playSurah();
};

// Update progress bar
const updateProgress = function (e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
};

// Set progress bar
const setProgress = function (e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
};

///////////////////////////////////////////
// Event listeners
playBtn.addEventListener("click", function () {
	const isPlaying = quranContainer.classList.contains("play");

	if (isPlaying) pauseSurah();
	else playSurah();
});

document.addEventListener("keydown", function (event) {
	if (event.keyCode === 32) {
		const isPlaying = quranContainer.classList.contains("play");

		if (isPlaying) pauseSurah();
		else playSurah();
	} else return;
});

// Change Surah
prevBtn.addEventListener("click", prevSurah);
nextBtn.addEventListener("click", nextSurah);

// Time/Surah update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Surah ends
audio.addEventListener("ended", nextSurah);

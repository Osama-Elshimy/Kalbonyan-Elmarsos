const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

//////////////////////////////////////////////
// Functions

// Show song and artist in DOM
const showData = function (data) {
	result.innerHTML = `
    <ul class="songs">
      ${data.data
				.map(
					song => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
				)
				.join("")}
    </ul>
  `;

	if (data.prev || data.next) {
		more.innerHTML = `
      ${
				data.prev
					? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
					: ""
			}
      ${
				data.next
					? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
					: ""
			}
    `;
	} else {
		more.innerHTML = "";
	}
};

// Search by song or artist
const searchSongs = async function (term) {
	const res = await fetch(`${apiURL}/suggest/${term}`);
	const data = await res.json();

	showData(data);
};

// Get prev and next songs
const getMoreSongs = async function (url) {
	const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
	const data = await res.json();

	showData(data);
};

// Get lyrics for song
const getLyrics = async function (artist, songTitle) {
	const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
	const data = await res.json();

	console.log(data);
	console.log(data.lyrics);

	if (data.lyrics) return;

	const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

	result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;

	more.innerHTML = "";
};

//////////////////////////////////////////////
// Event listeners
form.addEventListener("submit", function (e) {
	e.preventDefault();

	const searchTerm = search.value.trim();

	if (!searchTerm) {
		alert("Please type in a search term");
	} else {
		searchSongs(searchTerm);
	}
});

// Get lyrics button click
result.addEventListener("click", function (e) {
	const clickedEl = e.target;

	if (clickedEl.tagName === "BUTTON") {
		const artist = clickedEl.getAttribute("data-artist");
		const songTitle = clickedEl.getAttribute("data-songtitle");

		getLyrics(artist, songTitle);
	}
});

//console.log('before result', localStorage["total_elements"]);
const results = localStorage["total_elements"].split(",");
const shuffled = results.sort(() => {
	return 0.5 - Math.random();
});
const selected = (total) => shuffled.slice(0, total);
// console.log('result', selected(15));
/* Example words setup */
selected(15).map((word) =>
	window.WordFindGame.insertWordBefore($("#add-word").parent(), word),
);

/* Init */
function recreate() {
	$("#result-message").removeClass();
	let game;
	try {
		game = new WordFindGame("#puzzle", {
			allowedMissingWords: 0,
			maxGridGrowth: +$("#max-grid-growth").val(),
			fillBlanks: true,
			maxAttempts: 100,
		});
	} catch (error) {
		$("#result-message")
			.text(`Sad Face ${error}, try to specify less ones`)
			.css({ color: "red" });
		return;
	}

	if (window.game) {
		$("#result-message")
			.text(
				`Happy Face ${WordFindGame.emptySquaresCount() ? "but there are empty squares" : ""}`,
			)
			.css({ color: "" });
	}
	window.game = game;
}
recreate();

function reloadMainTab() {
	window.location.href = chrome.extension.getURL("index.html");
}

document.getElementById("refresh").addEventListener("click", reloadMainTab);
$("#create-grid").click(recreate);
$("#print").click(() => window.print());
$("#solve").click(() => game.solve());
window.parent.postMessage({ type: "hideFrame" }, "*");

const getRenderedWords = document.body.innerText
	//convert to lowercase
	.toLowerCase()
	// remove special characters
	.replace(/\'s+/, "")
	.replace(/[0-9`~!@#$%^&*()_|+\-\–=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
	.replace(/`${}`/gi, "");

const unnecessaryWords = [""];
//const unnecessaryWords = ['what', 'where', 'from', 'want', 'use', 'using', 'used', 'share', 'sharing', 'ask', 'asking', 'asked', 'that', 'this', 'have', 'should', 'anything', 'here', 'with', 'will', "they", "them", "their", "theirs", "themself", "herself", "himself", 'you', 'your', 'would', 'do', 'does', 'such', 'follow', 'before', 'after', 'also', 'just', 'need', 'needing', 'needs', 'did', 'didnt', 'show', 'showing', 'hide', 'find', 'finding', 'public', 'policy', 'see', 'seeing', 'thing', 'things', 'while', 'about', 'ever', 'more', 'for', 'some', 'sitemap', 'home', 'between', 'privacy', 'mean'];

function escape(words) {
	return words.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function removeWords(arr, str) {
	const escapedArr = arr.map((v) => escape(v));
	const regex = new RegExp(
		"(?:^|\\s)" + escapedArr.join("|") + "(?!\\S)",
		"gi",
	);
	return str.replace(regex, "");
}

function removeDuplicates(data) {
	return [...new Set(data)];
}

const arr = (str, word) => {
	str = str
		.split(" ")
		.filter((str) => {
			word = str.match(/(\w+)/);
			return word && word[0].length > 3;
		})
		.filter((str) => {
			word = str.match(/(\w+)/);
			return word && word[0].length < 15;
		})
		.join(" ");
	return str.match(/\b(\w+)\b/g);
};

let data = arr(removeWords(unnecessaryWords, getRenderedWords));

const results = removeDuplicates(data);
// console.log('results', results);

const shuffled = results.sort(() => 0.5 - Math.random());
const selected = (total) => shuffled.slice(0, total);

const stats = {
	basicClean: data.length,
	removeDuplicates: results.length,
	random20: selected(15),
};

// console.table(stats);
// console.log("get results: ", results);

chrome.runtime.sendMessage({
	total_elements: results,
});

chrome.runtime.onMessage.addListener((request) => {
	console.log(request);
	if (request.type === "popup-modal") {
		showModall();
	}
});

const showModall = () => {
	const modal = document.createElement("dialog");
	modal.setAttribute(
		"style",
		`
      width: 100%;
	  max-width: 1000px;
      height: 800px;
      padding: 0;
      border: none;
      top:0;
      bottom:0;
      border-radius:20px;
      background-color:white;
      position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
	  overflow: hidden;
	  border: 4px solid black;
      `,
	);
	modal.id = "__The_Model_Modal__";
	modal.innerHTML = `<iframe id="popup-content" style="height:100%;width: 100%;padding: 1rem;"></iframe>
      <div style="position:absolute; top: 10px; right: 10px;">
      <button type="button" style="padding: 2px; color: black; cursor: pointer; height: 20px; width: 20px; min-width: 100%; justify-content: center; background-color: #edf0f8; display: flex; align-items: center; border: none; border-radius: 20px; border: 1px solid black;"><svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
      </div>`;
	document.body.appendChild(modal);
	const dialog = document.getElementById("__The_Model_Modal__");
	dialog.showModal();
	const iframe = document.getElementById("popup-content");
	iframe.src = chrome.runtime.getURL("index.html");
	iframe.frameBorder = 0;
	(dialog.querySelector("button") && dialog).addEventListener("click", () => {
		dialog.close();
	});
};

const getRenderedWords = document.body.innerText
    //convert to lowercase
    .toLowerCase()
    // remove special characters
    .replace(/\'s+/, '')
    .replace(/[0-9`~!@#$%^&*()_|+\-\–=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
    .replace(/`${}`/gi, '');


const unnecessaryWords = ['what', 'where', 'from', 'want', 'use', 'using', 'used', 'share', 'sharing', 'ask', 'asking', 'asked', 'that', 'this', 'have', 'should', 'anything', 'here', 'with', 'will', "they", "them", "their", "theirs", "themself", "herself", "himself", 'you', 'your', 'would', 'do', 'does', 'such', 'follow', 'before', 'after', 'also', 'just', 'need', 'needing', 'needs', 'did', 'didnt', 'show', 'showing', 'hide', 'find', 'finding', 'public', 'policy', 'see', 'seeing', 'thing', 'things', 'while', 'about', 'ever', 'more', 'for', 'some', 'sitemap', 'home', 'between', 'privacy', 'mean'];

function escape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

function removeWords(arr, str) {
    let escapedArr = arr.map(v => escape(v))
    let regex = new RegExp("(?:^|\\s)" + escapedArr.join('|') + "(?!\\S)", "gi")
    return str.replace(regex, '');

}

function removeDuplicates(data) {
    return [...new Set(data)]
};

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

const results = removeDuplicates(data)
// console.log('results', results);





let shuffled = results.sort(function() {
    return .5 - Math.random()
});
let selected = (total) => shuffled.slice(0, total);

const stats = {
    basicClean: data.length,
    removeDuplicates: results.length,
    random20: selected(8)
};

// console.table(stats);
// console.log("get results: ", results);

chrome.runtime.sendMessage({
    total_elements: results
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.type === 'popup-modal') {
        showModal();
    }
})
const showModal = () => {
    const modal = document.createElement("dialog");
    modal.setAttribute(
        "style", `
      width: 1000px;
      height: 800px;
      border: none;
      top:0;
      bottom:0;
      border-radius:20px;
      background-color:white;
      position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
      `
    );
    modal.innerHTML = `<iframe id="popup-content"; style="height:100%;width: 100%;"></iframe>
      <div style="position:absolute; top:0px; left:0px;">
      <button style="padding: 2px 13px; font-size: 20px; border: none; border-radius: 20px; border: 1px solid black;">x</button>
      </div>`;
    document.body.appendChild(modal);
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    const iframe = document.getElementById("popup-content");
    iframe.src = chrome.extension.getURL("index.html");
    iframe.frameBorder = 0;
    dialog.querySelector("button").addEventListener("click", () => {
        dialog.close();
    });
}
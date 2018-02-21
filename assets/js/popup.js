
var console = chrome.extension.getBackgroundPage().console;

function contentScript() {
    chrome.tabs.executeScript({
        file: 'assets/js/contentScript.js'
    });
}

var app = {
    init: function() {
        //Cache elements
        var submitClicked = document.getElementById('submitBtn'),
        	stylesTextArea = document.getElementById('stylesTextArea'),
        	noStyles = '';


        //Adding Selectors
        chrome.runtime.sendMessage({ fn: "getSelector" }, function(response) {
            //console.log("got selector" + response.selector);
            if (response === "") {
                noStyles = response.style;
                console.log("you are here" + stylesTextArea.value);
            } else {
            	var currentStyle = stylesTextArea.value;
            	console.log(currentStyle);
                currentStyle = response.style;
            }
        });


        //Sends border or shader style to page
        submitClicked.addEventListener('click', function() {
        	let currentStyle = stylesTextArea.value;

            chrome.runtime.sendMessage({ fn: "setSelections", style: currentStyle});
            //Runs contentscript so background respnonse will activate selectors on current page
            	contentScript();
        });

	}
}

app.init();


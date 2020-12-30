chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
       localStorage["total_elements"] = request.total_elements;
    }
);
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "popup-modal" });
    });
});
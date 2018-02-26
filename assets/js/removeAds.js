chrome.storage.local.get('removeAdChecked', function (request) {
    checkAdsListener(request);
});

function checkAdsListener(request, sender, sendResponse) {
    var divNode = document.createElement("div");
    if (request.removeAdChecked) {
        divNode.innerHTML = "<br><style>#tads,#tadsb {display: none;}</style>";
        document.body.appendChild(divNode);
    } else {
        divNode.innerHTML = "";
        document.body.appendChild(divNode);
    }
}
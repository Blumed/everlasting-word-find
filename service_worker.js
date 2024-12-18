async function getCurrentTab() {
	const queryOptions = { active: true, lastFocusedWindow: true };
	const [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

chrome.runtime.onInstalled.addListener(async () => {
	console.log(await getCurrentTab());
});

chrome.action.onClicked.addListener(handleBrowserActionClicked);

function handleBrowserActionClicked(tab) {
	togglePlugin(tab);
}

function togglePlugin(tab) {
	console.log("toggle plugin");
	chrome.tabs.sendMessage(tab.id, { type: "popup-modal" });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	chrome.storage.local.set({ total_elements: request.total_elements });
	// .then(() => {
	// 	console.log("Value is set bobb", request.total_elements);
	// });
});

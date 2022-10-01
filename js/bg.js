import * as content from "./pkg/content.js";

chrome.tabs.onUpdated.addListener(async(tabId, changeInfo, tab) => {
    if (!tab.highlighted) {
        return;
    }

    if ('status' in changeInfo && changeInfo['status'] === 'loading') {
        content.updateTab(tab);
    }

    if ('title' in changeInfo && changeInfo['title'] === 'Privacy error') {
        content.updateTab(tab);
    }
});

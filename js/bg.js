import * as content from "./pkg/content.js";

chrome.tabs.onActivated.addListener(async(activeInfo) => {
    chrome.tabs.query({}, async(tabs) => {
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].id === activeInfo.tabId) {
                await content.updateTab(tabs[i]);
                break;
            }
        }
    })
});

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

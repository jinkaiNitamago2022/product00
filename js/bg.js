import * as tabs from "./pkg/tabs.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    tabs.getCertInfoFromCurrentTab(request).then(sendResponse);
    return true;
});

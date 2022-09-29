chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if ('status' in changeInfo && changeInfo['status'] === 'loading') {
        updateTab(tab);
    }
  
    if ('title' in changeInfo && changeInfo['title'] === 'Privacy error') {
        updateTab(tab);
    }
});

function updateTab(tab) {
    console.log("fired");
}

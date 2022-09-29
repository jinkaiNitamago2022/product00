chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if ('status' in changeInfo && changeInfo['status'] === 'loading') {
        updateTab(tab);
    }
  
    if ('title' in changeInfo && changeInfo['title'] === 'Privacy error') {
        updateTab(tab);
    }
});

async function updateTab(tab, origin) {
    var origin = "https://github.com"  // origin は仮
    var rawCertInfo = await (await getRawCertInfo(origin)).json();
    var [commonName, organization] = [rawCertInfo.message.subject.CN, rawCertInfo.message.subject.O];
    console.log("commonName: " + commonName);
    console.log("Organization: " + organization);
}

async function getRawCertInfo(origin) {
    var url = "https://jinkai-nitamago-cert.netlify.app/.netlify/functions/getcertinfo";
    var data = {
        "q": origin
    };
    return await fetch(url + "?" + new URLSearchParams(data));
}

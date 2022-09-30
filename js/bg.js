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
    var [commonName, organization] = await getCertInfo(
        origin,
        async (res) => {
            var j = await res.json();
            return [j.message.subject.CN, j.message.subject.O];
        }
    )
    console.log("commonName: " + commonName);
    console.log("Organization: " + organization);
}

async function getCertInfo(origin="", callback=async() => {}) {
    var url = "https://jinkai-nitamago-cert.netlify.app/.netlify/functions/getcertinfo";
    var data = {
        "q": origin
    };
    return await callback(await fetch(url + "?" + new URLSearchParams(data)));
}

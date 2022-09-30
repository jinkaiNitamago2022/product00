chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if ('status' in changeInfo && changeInfo['status'] === 'loading') {
        updateTab(tab);
    }
  
    if ('title' in changeInfo && changeInfo['title'] === 'Privacy error') {
        updateTab(tab);
    }
});

async function updateTab(tab, url) {
    var url = 'https://github.com';
    var [commonName, organization] = await getCertInfo(
        url,
        async (res) => {
            var j = await res.json();
            return [j.message.subject.CN, j.message.subject.O];
        }
    )
    console.log('commonName: ' + commonName);
    console.log('Organization: ' + organization);
}

async function getCertInfo(url="", callback=async() => {}) {
    // var scheme = getScheme(url); // 想定
    // if (scheme != 'https') {
    //     return ['', ''];
    // }
    // var domain = getDomain(url);  // 想定
    var domain = 'github.com';  // domain は仮

    var api = 'https://jinkai-nitamago-cert.netlify.app/.netlify/functions/getcertinfo';
    var data = {
        'q': domain
    };
    return await callback(await fetch(api + '?' + new URLSearchParams(data)));
}

chrome.tabs.onActivated.addListener((activateInfo) => {
    currentTabId = activateInfo.tabId;
})

chrome.tabs.onUpdated.addListener(async(tabId, changeInfo, tab) => {
    // if (tabId !== currentTabId) {
    //     return;
    // }

    if ('status' in changeInfo && changeInfo['status'] === 'loading') {
        updateTab(tab);
    }

    if ('title' in changeInfo && changeInfo['title'] === 'Privacy error') {
        updateTab(tab);
    }
});

function getCurrentTabUrl(tab) {
    return tab.url;
}

async function updateTab(tab) {
    var [commonName, organization] = await getCertInfo(
        getCurrentTabUrl(tab),
        async(res) => {
            var j = await res.json();
            return [j.message.subject.CN, j.message.subject.O];
        }
    )
    chrome.storage.sync.set(
        {
            'commonName': commonName,
            'organization': organization
            // 後に脅威情報リンクも追記する
        }
    );
    console.log('commonName: ' + commonName);
    console.log('Organization: ' + organization);
}

function breakUpUrl(url="") {
    return url.match('(.+?)://([^/]+)(.*)').slice(1);
}

async function getCertInfo(url="", callback=async() => {}) {
    var [scheme, domain, _] = breakUpUrl(url);
    if (scheme !== 'https') {
        return;
    }

    var api = 'https://jinkai-nitamago-cert.netlify.app/.netlify/functions/getcertinfo';
    var data = {
        'q': url
    };
    return await callback(await fetch(api + '?' + new URLSearchParams(data)));
}

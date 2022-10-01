var data = {};
var currentTabId = -1;

chrome.tabs.onActivated.addListener((activateInfo) => {
    currentTabId = activateInfo.tabId;
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    getCertInfoFromCurrentTab(request).then(sendResponse);
    return true;
});

async function getCertInfoFromCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    await updateTab(tab);
    return data[currentTabId];
}

function getCurrentTabUrl(tab) {
    return tab.url;
}

async function updateTab(tab) {
    var [commonName, organization] = await getCertInfo(
        getCurrentTabUrl(tab),
        async (res) => {
            var j = await res.json();
            return [j.message.subject.CN, j.message.subject.O];
        }
    )
    data[tab.id] = {
        "commonName": commonName,
        "organization": organization
        // 後に脅威情報リンクも追記する
    };
    console.log('commonName: ' + commonName);
    console.log('Organization: ' + organization);
}

function breakUpUrl(url = "") {
    return url.match('(.+?)://([^/]+)(.*)').slice(1);
}

async function getCertInfo(url = "", callback = async () => { }) {
    var [scheme, domain, _] = breakUpUrl(url);
    if (scheme != 'https') {
        return;
    }

    var api = 'https://jinkai-nitamago-cert.netlify.app/.netlify/functions/getcertinfo';
    var data = {
        'q': domain
    };
    return await callback(await fetch(api + '?' + new URLSearchParams(data)));
}

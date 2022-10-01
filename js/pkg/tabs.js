import * as certInfo from './certificate-Info.js';
import * as storage from './storage.js';
import * as url from './url.js';

export async function getCertInfoFromCurrentTab() {
    let storageCache = {};
    await storage.assignStorageCache(storageCache);

    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    await updateTab(tab);

    let sendCertInfo = {};
    await storage.assignStorageCache(sendCertInfo);

    sendCertInfo.print_flag = true;
    if (storageCache.commonName == sendCertInfo.commonName) {
        sendCertInfo.print_flag = false;
    }
    return sendCertInfo;
}

async function updateTab(tab) {
    var [commonName, organization] = await certInfo.getCertInfo(
        url.getCurrentTabUrl(tab),
        async (res) => {
            var j = await res.json();
            return [j.message.subject.CN, j.message.subject.O];
        }
    )

    // undefinedが保存できないから"unknown"で置き換える
    if (organization === undefined) organization = "unknown";

    chrome.storage.session.set(
        {
            'commonName': commonName,
            'organization': organization
            // 後に脅威情報リンクも追記する
        }
    );

    console.log('commonName: ' + commonName);
    console.log('Organization: ' + organization);

    // ↓ のような感じで、storageCache に保存した情報を取得する
    // storage.assignStorageCache(storageCache);
    // console.log(storageCache);
}

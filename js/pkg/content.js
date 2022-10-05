import * as certInfo from './certificate-Info.js';
import * as storage from './storage.js';
import * as url from './url.js';
import * as links from './links.js';

export async function updateTab(tab) {
    // 前回取得した証明書情報を保持しておく
    let storageCache = {};
    await storage.assignStorageCache(storageCache);

    // 証明書を取得する
    var [commonName, organization] = await certInfo.getCertInfo(
        url.getCurrentTabUrl(tab),
        async (res) => {
            var j = await res.json();
            try {
                return [j.message.subject.CN, j.message.subject.O];
            } catch (err) {
                if (err instanceof TypeError) {
                    console.log("hi");
                    return [undefined, undefined];
                } else {
                    console.log(err);
                }
            }
        }
    )

    // undefinedが保存できないから"unknown"で置き換えるロジックを追加
    await chrome.storage.session.set(
        {
            'tab': tab,
            'commonName': typeof commonName !== 'undefined' ? commonName : 'Unknown',
            'organization': typeof organization !== 'undefined' ? organization : 'Unknown'
            // 後に脅威情報リンクも追記する
        }
    );

    console.log('commonName: ' + commonName);
    console.log('Organization: ' + organization);

    // 今回取得した証明書情報
    let sendCertInfo = {};
    await storage.assignStorageCache(sendCertInfo);

    // 今回と前回が同じcommonNameであれば証明書情報を送らない
    if (storageCache.commonName !== sendCertInfo.commonName) {
        let request = {
            type: "sendCertInfo",
            value: sendCertInfo
        };

        // 現在アクティブになっているタブに証明書情報を送る
        let rtnPromise = chrome.tabs.sendMessage(tab.id, request);
        rtnPromise
            .then((response) => {
                // コールバック関数の処理
            })
            .catch((error) => {
                // エラー処理
            });
    }

    await testGenerateLinks(storageCache);  // リンク生成をテストする
}

// リンク生成をテストする関数、マージ時消す（import も適宜消す）
// いまはテストで
// 1. storage に tab を登録
// 2. tab から url を取得
// 3. リンクを生成
// という流れにしていますが、最終的に storage に登録する情報を tab ではなく、
// links: {
//     'virusTotalUrlLink': value,
//     'virusTotalDomainLink: value,
//     'digicertLink: value
// }
// を登録するかもしれません
// どちらがいい、などありましたら教えてください
async function testGenerateLinks(storageCache) {
    await storage.assignStorageCache(storageCache);
    (await links.generateAllLinks(storageCache.tab)).map(v => console.log(v))
}

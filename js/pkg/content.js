import * as certInfo from './certificate-Info.js';
import * as storage from './storage.js';
import * as url from './url.js';
import * as links from './links.js';

const storageCache = {};

export async function updateTab(tab) {
    var [commonName, organization] = await certInfo.getCertInfo(
        url.getCurrentTabUrl(tab),
        async(res) => {
            var j = await res.json();
            return [j.message.subject.CN, j.message.subject.O];
        }
    )
    chrome.storage.session.set(
        {
            'tab': tab,
            'commonName': typeof commonName !== 'undefined' ? commonName : 'Unknown',
            'organization': typeof organization !== 'undefined' ? organization : 'Unknown'
            // 後に脅威情報リンクも追記する
        }
    );

    console.log('commonName: ' + commonName);
    console.log('Organization: ' + organization);

    // ↓ のような感じで、storageCache に保存した情報を取得する
    // await storage.assignStorageCache(storageCache);
    // console.log(storageCache);

    await testGenerateLinks();  // リンク生成をテストする
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
async function testGenerateLinks() {
    await storage.assignStorageCache(storageCache);
    for (let link of links.generateAllLinks(storageCache.tab)) {
        console.log(link);
    }
}

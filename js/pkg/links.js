import * as urlMod from './url.js';
import * as hashMod from './hash.js';

const VIRUSTOTAL_BASE = 'https://www.virustotal.com/gui'

export async function generateVirusTotalDomainLink(domain='') {
    return `${VIRUSTOTAL_BASE}/domain/${domain}`;
}

const generateVirusTotalUrlLink = async (url) => {
    const hash = await hashMod.calcSha256HashValue(url)
    return `${VIRUSTOTAL_BASE}/url/${hash}`;
}

export async function generateAllLinks(tab) {
    var url = urlMod.getCurrentTabUrl(tab);
    var [_, domain, _] = urlMod.breakUpUrl(url);

    return [
        await generateVirusTotalUrlLink(url),
        await generateVirusTotalDomainLink(domain),
        // generateDigicertLink(domain)  // 関数名は好きに変えてください
    ];
}

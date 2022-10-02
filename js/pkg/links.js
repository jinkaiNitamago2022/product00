import * as urlMod from './url.js';

const VIRUSTOTAL_BASE = 'https://www.virustotal.com/gui'

export function generateVirusTotalDomainLink(domain='') {
    return `${VIRUSTOTAL_BASE}/domain/${domain}`;
}

export function generateAllLinks(tab) {
    var url = urlMod.getCurrentTabUrl(tab);
    var [_, domain, _] = urlMod.breakUpUrl(url);
    console.log(generateVirusTotalDomainLink(domain));

    return [
        // generateVirusTotalUrlLink(url),  // 関数名は好きに変えてください
        generateVirusTotalDomainLink(domain),
        // generateDigicertLink(domain)  // 関数名は好きに変えてください
    ];
}

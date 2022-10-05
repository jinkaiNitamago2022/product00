import * as urlMod from './url.js';
import * as hashMod from './hash.js';

const VIRUSTOTAL_BASE = 'https://www.virustotal.com/gui'
const DIGICERT_BASE = 'https://www.digicert.com/help';

export async function generateVirusTotalDomainLink(domain='') {
    return `${VIRUSTOTAL_BASE}/domain/${domain}`;
}

const generateVirusTotalUrlLink = async (url) => {
    const hash = await hashMod.calcSha256HashValue(url)
    return `${VIRUSTOTAL_BASE}/url/${hash}`;
}

export async function generateDigicertLink(domain='') {
    return `${DIGICERT_BASE}?host=${domain}`;
}

export async function generateAllLinks(tab) {
    var url = urlMod.getCurrentTabUrl(tab);
    var [_, domain, _] = urlMod.breakUpUrl(url);

    return [
        await generateVirusTotalUrlLink(url),
        await generateVirusTotalDomainLink(domain),
        await generateDigicertLink(domain)
    ];
}

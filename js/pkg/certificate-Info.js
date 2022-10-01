import * as urlMod from './url.js'

export async function getCertInfo(url='', callback=async() => {}) {
    var [scheme, domain, _] = urlMod.breakUpUrl(url);
    if (scheme !== 'https') {
        return;
    }

    var api = 'https://jinkai-nitamago-cert.netlify.app/.netlify/functions/getcertinfo';
    var data = {
        'q': domain
    };
    return await callback(await fetch(api + '?' + new URLSearchParams(data)));
}

export function getCurrentTabUrl(tab) {
    return tab.url;
}

export function breakUpUrl(url='') {
    return url.match('(.+?)://([^/]+)(.*)').slice(1);
}

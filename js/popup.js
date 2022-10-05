import * as storage from './pkg/storage.js';

const COLOR_THEME = {
    'disabled': 'gray',
    'danger': 'red',
    'safety': 'rgb(25, 135, 84)'
};

document.addEventListener('DOMContentLoaded', async(event) => {
    let storageCache = {};
    await storage.assignStorageCache(storageCache);

    var theme = '';
    document.getElementById('ssl-organization').innerHTML = storageCache.organization;
    if (typeof storageCache.organization === 'undefined') {
        theme = 'disabled';
        storageCache.virusTotalUrlLink = '#';
        storageCache.virusTotalDomainLink = '#';
        storageCache.digicertLink = '#';
    } else if (storageCache.organization === 'Unknown') {
        theme = 'danger';
    } else {
        theme = 'safety';
    }
    document.getElementById('ssl-organization').style.color = COLOR_THEME[theme];
    document.getElementsByTagName('body')[0].style.backgroundColor = COLOR_THEME[theme];
    Array.prototype.forEach.call(document.getElementsByTagName('hr'), (ele) => {
        ele.style.backgroundColor = COLOR_THEME[theme];
    });

    document.getElementById('virus-total-url-link').setAttribute('href', storageCache.virusTotalUrlLink);
    document.getElementById('virus-total-domain-link').setAttribute('href', storageCache.virusTotalDomainLink);
    document.getElementById('digicert-link').setAttribute('href', storageCache.digicertLink);
})

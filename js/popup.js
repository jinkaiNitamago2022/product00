import * as storage from './pkg/storage.js';

const storageCache = {};

document.addEventListener('DOMContentLoaded', async(event) => {
    await storage.assignStorageCache(storageCache);

    document.getElementById('ssl-organization').innerHTML = storageCache.organization;
})

const storageCache = {};

chrome.action.onClicked.addListener(async(tab) => {
    await getAllStorageSyncData().then((items) => {
        Object.assign(storageCache, items);
        console.log(storageCache);
    });
});

document.addEventListener('DOMContentLoaded', async(event) => {
    await getAllStorageSyncData().then((items) => {
        Object.assign(storageCache, items);
    });

    document.getElementById('ssl-organization').innerHTML = storageCache.organization;
})

function getAllStorageSyncData() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(null, (items) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    });
}

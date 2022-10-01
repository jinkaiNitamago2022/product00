export async function assignStorageCache(storageCache={}) {
    await getAllStorageSessionData().then((items) => {
        Object.assign(storageCache, items);
    });

    return storageCache;
};

function getAllStorageSessionData() {
    return new Promise((resolve, reject) => {
        chrome.storage.session.get(null, (items) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    });
}

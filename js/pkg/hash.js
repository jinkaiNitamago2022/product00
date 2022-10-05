
export const calcSha256HashValue = async (text) => {
    return new Promise((resolve) => {
        const encodedText = new TextEncoder("utf-8").encode(text);
        crypto.subtle.digest('SHA-256', encodedText).then((hashBuffer) => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map((b) => {return b.toString(16).padStart(2, '0')}).join('');
            return resolve(hashHex);
        });
    });
}

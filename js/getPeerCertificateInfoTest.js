import https from 'https';

const getPeerCertificateInfo = (hostname) => {
    return new Promise((resolve, reject) => {
        // use ssl to connect
        const options = {
            hostname: hostname,
            port: 443,
            path: '/',
            method: 'GET',
            rejectUnauthorized: false
        };

        https.request(options, (res) => {
            resolve(res.socket.getPeerCertificate());
        }).on('error', (e) => {
            console.error(e);
            reject(null);
        }).end();
    });
};

// print certinfo to console
(async () => {
    const certInfo = await getPeerCertificateInfo('www.google.com');
    console.log(certInfo);
})();
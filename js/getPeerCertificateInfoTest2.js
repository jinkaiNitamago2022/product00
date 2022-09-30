async function getPeerCertificateInfo() {
    sourceCode = "openssl s_client -connect www.dendai.ac.jp:443 -showcerts < /dev/null 2>&1 | grep '[si]:'";
    lang = "bash";
    input = "";
    apiKey = "guest";
    console.log(await executeCode(sourceCode, lang, input, apiKey));    
}

getPeerCertificateInfo();

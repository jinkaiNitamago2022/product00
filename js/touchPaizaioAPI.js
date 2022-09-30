async function createSession(sourceCode="", lang="", input="", apiKey="") {
    url = "https://api.paiza.io/runners/create";
    method = "POST";
    data = {
        "source_code": sourceCode,
        "language": lang,
        "input": input,
        "api_key": apiKey
    };

    try {
        return await (await post(url, data)).json();
    } catch(err) {
        throw err;
    }
}

async function waitWhileExecuting(sessionID="", apiKey="") {
    url = "https://api.paiza.io/runners/get_status";
    method = "GET";
    data = {
        "id": sessionID,
        "api_key": apiKey
    };

    executingSymbol = "running";
    updateInterval = 100;
    try {
        while(executingSymbol == "running") {
            res = await (await get(url, data)).json();
            executingSymbol = res["status"];
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, updateInterval);
            });
        }
        return res;
    } catch(err) {
        throw err;
    }
}

async function getExecutedResult(sessionID="", apiKey="") {
    url = "https://api.paiza.io/runners/get_details"
    data = {
        "id": sessionID,
        "api_key": apiKey
    };

    try {
        return await (await get(url, data)).json();
    } catch(err) {
        throw err;
    }
}

async function executeCode(sourceCode="", lang="", input="", apiKey="") {
    res = await createSession(sourceCode, lang, input, apiKey);
    res = await waitWhileExecuting(res["id"], apiKey);
    res = await getExecutedResult(res["id"], apiKey);
    return res["stdout"];
}

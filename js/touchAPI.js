async function get(url="", data={}) {
    return await fetch(url + "?" + new URLSearchParams(data));
}

async function post(url="", data={}) {
    return await fetch(
        url,
        {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
}

{
    chrome.tabs.query({}, tabs => {
        for(let i=0; i<tabs.length; i++){
            console.log(tabs[i].url);
        }
    });
}
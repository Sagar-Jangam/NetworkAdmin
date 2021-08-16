try {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        //console.log("at the background script");
        let responseData = 1;
        if(message.options){
            console.log(message.URL);
            (async () => {
                const rawResponse = await fetch("https://safesite.herokuapp.com", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({URL: message.URL, options: message.options})
                });
                const content = await rawResponse.json();
                console.log(content); //data from the server
                sendResponse({res:JSON.stringify(content)}); //sending data back to content.js
            })();
            //sendResponse({res: rawResponse});
        }
        else{
          sendResponse({res:"error"})
        }
        return true;
    })
} catch(e){
    console.error(e);
}

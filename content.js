try{
	chrome.runtime.onMessage.addListener((messagea, sendera, sendResponsea) => {
	if(messagea.greetinga == 'GetDOM'){
		let resDOM = document.all[0].outerHTML;
		sendResponsea({resa: resDOM}); //sending response back to popup.js
	}
})
} catch(e){
	console.log(e);
}

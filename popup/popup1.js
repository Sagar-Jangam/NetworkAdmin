
//working code
document.addEventListener('DOMContentLoaded', function() {
  var checkButton = document.getElementById('option_dns_a');
  checkButton.addEventListener('click', function() {
   chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  		alert("URL: " + tabs[0].url);
    	chrome.runtime.sendMessage({options: "dns_a", URL: tabs[0].url}, function (response) {
            	alert(response.res);
              document.getElementById("response_url").value = response.res; //reflecting value in the popup.html
        	});
    	});
  });
});

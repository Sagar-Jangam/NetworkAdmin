document.addEventListener('DOMContentLoaded', function() {
//execution starts as basic HTML of DOM is loaded
  var checkDiv = document.getElementById('popup-content');
  var button_dns_a = document.getElementById('option_dns_a');
  var button_dns_c = document.getElementById('option_dns_c');
  var button_whois_r = document.getElementById('option_whois_r')
  var button_whois_d = document.getElementById('option_whois_d')
  var button_phish = document.getElementById('option_phish');
  var button_cidr = document.getElementById('option_cidr1');
  checkDiv.addEventListener('click', function(){
    //alert("running the functions")
    var clicked_option = 'str';
    //var button_dns_ns = document.getElementById('option_dns_ns'); //testing code
    //document.getElementById("response_url").value = button_dns_c.id; // testing code
    button_dns_a.addEventListener('click', function(){clicked_option = "dns_a"});
    button_dns_c.addEventListener('click', function(){clicked_option = "dns_c"});
    //button_dns_ns.addEventListener('click', function(){clicked_option = "dns_ns"});
    button_phish.addEventListener('click', function(){
      alert("Function coming up...")
      //clicked_option = "phish"
      clicked_option = ""//this is cause an error as div_id wont be assinged any value
    })
    button_whois_r.addEventListener('click', function(){clicked_option = "whois_r"})
    button_whois_d.addEventListener('click', function(){clicked_option = "whois_d"})
    button_cidr.addEventListener('click', function(){
      var data = document.getElementById("input_cidr");
      if(data.value){clicked_option = "cidr_"+data.value;}
      else{
        alert("Enter a CIDR")
        clicked_option = "" //div_id is not generated due to empty value, thus error
      }
    })

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      //alert("connecting to background")
      //alert(clicked_option)
      var div_id = "option_"+clicked_option.split('_')[0]+"_output";
      document.getElementById(div_id).style.display = "block";
      document.getElementById(div_id+"_res").value = "Waiting for the results...";
      chrome.runtime.sendMessage({options: clicked_option, URL:tabs[0].url}, function(response){
        //alert("response came back "+response.res);
        if(response.res.split(":")[0] == "error"){
          alert("Try Again! Or the option not available for the site")
        }
        else{
          document.getElementById(div_id).style.display = "block";
          //document.getElementById(div_id+"_res").value = response.res.split(":")[1].slice(2,-3).replace('","', ', ');
          document.getElementById(div_id+"_res").value = response.res.split(":")[1].slice(1,-2);
        }
      });
    });

  }, true)
});

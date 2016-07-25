
function scrapeLinkedIn() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs[0].url.startsWith('https://www.linkedin.com')) {
      alert('Doesn\t work on this page!');
      return;
    }
    
    chrome.tabs.sendMessage(tabs[0].id, {secret: 'hello'}, function(response) {

      if (response == null) {
        console.log('No message handler');
      } else if (response.secret == 'goodbye') {

        chrome.tabs.create({url : 'https://104.236.247.194:3000/people/create', active: false}, function (tab) {
          var data = {secret: 'Fill out form plz', data: response.data};
          sendMessage(tab.id, data);
          
          var code = "var data = " + JSON.stringify(response.data) + ";";
          chrome.tabs.executeScript(tab.id, {code: code}, function() {
            chrome.tabs.executeScript(tab.id, {file: 'dev.js'}, function() {
              chrome.tabs.update(tab.id, {active: true});
            });
          });
        });

      }
    });
  });
}

function updatePerson() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs[0].url.startsWith('https://104.236.247.194:3000/people')) {
      alert('Doesn\t work on this page!');
      return;
    }

    chrome.tabs.sendMessage(tabs[0].id, {secret: 'Get URL plz'}, function(response) {

      if (response == null) {
        console.log('No message handler');
      } else if (response.url) {
        chrome.tabs.create({url: response.url, active: false}, function (tab) {
          chrome.tabs.sendMessage(tab.id, {secret: 'hello'}, function(response) {
            
            if (response == null) {
              console.log('No message handler');
            } else if (response.secret == 'goodbye') {
              console.log(response.data);
            }
            
          });
        });
      }

    });
  });
}

function sendMessage(tadId, data) {
  chrome.tabs.sendMessage(tabId, data, function(response) {
    if (response == null) {
      setTimeout(sendMessage(tabId, data));
    } else {
      console.log(response);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#scrapeLinkedIn').addEventListener(
      'click', scrapeLinkedIn);
  document.querySelector('#updatePerson').addEventListener(
      'click', updatePerson);
});

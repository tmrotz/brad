
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: 'hello'}, function(response) {
      if (response.farewell == 'goodbye') {

        chrome.tabs.create({url : 'https://104.236.247.194:3000/people/create'}, function (tab) {
          var code = "var data = " + JSON.stringify(response.data) + ";";
          chrome.tabs.executeScript(tab.id, {code: code}, function() {
            chrome.tabs.executeScript(tab.id, {file: 'dev.js'});
          });
        });

      }
    });
  });
});

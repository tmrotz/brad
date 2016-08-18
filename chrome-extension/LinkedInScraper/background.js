
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
          setTimeout(function(){
            var data = {secret: 'Fill out form plz', data: response.data};
            chrome.tabs.sendMessage(tab.id, data);
            chrome.tabs.update(tab.id, {active: true});
          }, 5000);
        });

      }
    });
  });
}

/**
 * Get url from current page
 * Open url
 * Send message to new tab
 * Respond with page data
 * Update current page with new data
 */
function updatePerson() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    
    if (!tabs[0].url.startsWith('https://104.236.247.194:3000/people')) {
      alert('Doesn\'t work on this page!');
      return;
    }
    if (!tabs[0].url.endsWith('/edit')) {
      alert('Doesn\'t work on this page!');
      return;
    }
    
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, {secret: 'Get URL plz'}, function(response) {

      if (response == null) {
        console.log('No message handler');
      } else if (response.url) {
        chrome.tabs.create({url: response.url, active: false}, function (tab) {
          
          setTimeout(function(){
            chrome.tabs.sendMessage(tab.id, {secret: 'hello'}, function(response) {
            
              if (response == null) {
                console.log('No message handler');
              } else if (response.secret == 'goodbye') {
                var data = {secret: 'Fill out form plz', data: response.data};
                chrome.tabs.sendMessage(activeTab.id, data);
              }
            
            });
          }, 5000);
          
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

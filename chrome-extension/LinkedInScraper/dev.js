
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.secret == 'Fill out form plz') {
      
      waitForRenderAndDoSomething(request.data);
      
      sendResponse({farewell: 'goodbye'});
    } else if (request.secret == 'Get URL plz') {
      var data = { url: document.getElementById('url').value }
      sendResponse(data);
    }
  }
);

var waitForRenderAndDoSomething = function(data) {
  if(document.getElementById('full_name') == null) {
    setTimeout(waitForRenderAndDoSomething(data));
  } else {
    if (data.hasOwnProperty('full_name')) {
      document.getElementById('full_name').value = data.full_name;  
    }
    if (data.hasOwnProperty('url')) {
      document.getElementById('url').value = data.url;
    }
    if (data.hasOwnProperty('location_safe')) {
      document.getElementById('location_safe').value = data.location_safe;
    }
    if (data.hasOwnProperty('job')) {
      document.getElementById('job').value = data.job;
    }
    if (data.hasOwnProperty('email')) {
      document.getElementById('email').value = data.email;
    }
    if (data.hasOwnProperty('phone')) {
      document.getElementById('phone').value = data.phone;
    }
    if (data.hasOwnProperty('keywords')) {
      document.getElementById('keywords').value = data.keywords;
    }
  }
}

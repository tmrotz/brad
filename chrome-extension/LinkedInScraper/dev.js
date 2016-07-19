
var waitForRenderAndDoSomething = function() {
  if(document.getElementById('full_name') == null) {
    setTimeout(waitForRenderAndDoSomething); // Wait for all templates to be loaded
  } else {
    //the code which needs to run after dom rendering
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
setTimeout(waitForRenderAndDoSomething); // Waits for first digest cycle

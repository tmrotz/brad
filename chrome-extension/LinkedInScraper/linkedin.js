
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.secret == "hello") {
      
      var data = scrapeLinkedin();
      
      sendResponse({secret: "goodbye", data: data});
    }
  }
);

function scrapeLinkedin() {
  var data = {};
  
  //<div id="name" class="editable-item">
  //  <h1>
  //    <span class="fn">
  //      <span class="full-name" dir="auto">
  //        Brad Rachal
  var full_name = document.querySelector('div#name h1 span.fn span.full-name');
  
  if (full_name) {
    data.full_name = full_name.innerHTML;
  }
  
  
  
  var url = window.location.href;
  var clean_url = url.substring(0, url.indexOf('?'));
  data.url = clean_url;
  
  
  
  //<div id="headline-container" data-li-template="headline">
  //  <div id="headline" class="editable-item">
  //    <p class="title" dir="ltr">
  //      Director of Banking at Express Recruiting
  var job = document.querySelector('div#headline-container div#headline p.title')
  
  if (job) {
    data.job = job.innerHTML;
  }
  
  
  
  //<div id="location" class="editable-item">
  //  <dl>
  //    <dt>Location</dt>
  //    <dd>
  //      <span class="locality">
  //        <a href="/vsearch/p?f_G=us%3A716&amp;trk=prof-0-ovw-location" name="location" title="Find other members in Greater Salt Lake City Area">
  //          Greater Salt Lake City Area
  var location_safe = document.querySelector('div#location dl dd span.locality a');
  
  if (location_safe) {
    data.location_safe = location_safe.innerHTML;
  }
  
  
  
  //<div id="email">
  //  <div id="email-view">
  //    <ul>
  //      <li>
  //        <a href="mailto:bradrachal@expressrecruitingservices.com">bradrachal@expressrecruitingservices.com</a>
  var email = document.querySelector("div#email div#email-view ul li a");
  
  if (email) {
    data.email = email.innerHTML;
  }
  
  
  
  // <div id="phone" class="editable-item">
  //   <div id="phone-view">
  //     <ul>
  //       <li>208-206-8548&nbsp;(Mobile)</li>
  var phone = document.querySelector('div#phone div#phone-view li')
  
  if (phone) {
    data.phone = phone.innerHTML;
  }
  
  
  
  //<dd class="industry">
  //  <a href="/vsearch/p?f_I=137&amp;trk=prof-0-ovw-industry" name="industry" title="Find other members in this industry">
  //    Human Resources
  var industry = document.querySelector('dd.industry a');
  
  if (industry) {
    data.keywords = industry.innerHTML;
  }
  
  
  return data;
}
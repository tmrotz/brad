'use strict';

var fs = require('fs');
var json = require('./bookmarks.json');

function parseJSON(json, keywords, fd) {
  if (json.type === 'url') {
    var bookmark = {};
    bookmark.full_name = json.name;
    bookmark.url = json.url;
    bookmark.keywords = keywords;
    fs.writeSync(fd, JSON.stringify(bookmark) + '\n', function (err) {
      if (err) throw err;
    });
    
    return;
  }

  keywords.push(json.name);
  for (var key in json.children) {
    if (json.children.hasOwnProperty(key)) {
      parseJSON(json.children[key], keywords, fd);
    }
  }
  keywords.pop();
}

var fd = fs.openSync('people.json', 'a');

parseJSON(json, [], fd);

fs.closeSync(fd);


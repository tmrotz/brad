var fs = require('fs');
var json = require('./bookmarks.json');

function parseJSON(json, attributes, fd) {
  if (json.type === 'url') {
    var bookmark = {};
    bookmark.full_name = json.name;
    bookmark.url = json.url;
    bookmark.attributes = attributes;
    fs.writeSync(fd, JSON.stringify(bookmark) + '\n', function (err) {
      if (err) throw err;
    });
    
    return;
  }

  attributes.push(json.name);
  for (var key in json.children) {
    if (json.children.hasOwnProperty(key)) {
      parseJSON(json.children[key], attributes, fd);
    }
  }
  attributes.pop();
}

var fd = fs.openSync('people.json', 'a');

parseJSON(json, [], fd);

fs.closeSync(fd);


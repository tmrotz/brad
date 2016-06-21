(function() {
  'use strict';

  var PeopleController = require('../controllers/people.js');

  /* jshint -W098 */
  // The Package is past automatically as first parameter
  module.exports = function(People, app, auth, database) {

    // Single person routes
    app.route('/api/people/:personId')
      .put(PeopleController.update)
      .delete(PeopleController.delete);

    // People collection routes
    app.route('/api/people')
      .get(PeopleController.list)
      .post(PeopleController.create);

  };
})();

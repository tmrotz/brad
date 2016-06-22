(function() {
  'use strict';

  var PeopleController = require('../controllers/people.js');

  /* jshint -W098 */
  // The Package is past automatically as first parameter
  module.exports = function(People, app, auth, database, circles) {

    var requiresAdmin = circles.controller.hasCircle('admin');
    var requiresLogin = circles.controller.hasCircle('authenticated');

    // People collection routes
    app.route('/api/people').all(requiresAdmin)
      .get(PeopleController.list)
      .post(PeopleController.create);

    // Single person routes
    app.route('/api/people/:personId').all(requiresAdmin)
      .get(PeopleController.read)
      .put(PeopleController.update)
      .delete(PeopleController.delete);

    // Finish by binding the person middleware
    app.param('personId', PeopleController.personByID);
  };
})();

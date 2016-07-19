(function() {
  'use strict';

  var PeopleController = require('../controllers/people.js');

  /* jshint -W098 */
  // The Package is past automatically as first parameter
  module.exports = function(People, app, auth, database, circles) {

    var requiresAdmin = circles.controller.hasCircle('admin');
    var requiresEmployee = circles.controller.hasCircle('employee');

    // People collection routes
    app.route('/api/people').all(requiresEmployee)
      .get(PeopleController.list)
      .post(PeopleController.create);

    app.get('/api/people/duplicates', requiresAdmin, PeopleController.duplicates);

    // Single person routes
    app.get('/api/people/:personId', requiresEmployee, PeopleController.read);
    app.put('/api/people/:personId', requiresEmployee, PeopleController.update);
    app.delete('/api/people/:personId', requiresAdmin, PeopleController.delete);

    // Finish by binding the person middleware
    app.param('personId', PeopleController.personByID);
  };
})();

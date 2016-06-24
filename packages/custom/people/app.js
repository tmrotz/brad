'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var People = new Module('people');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
People.register(function(app, auth, database, circles) {

  //We enable routing. By default the Package Object is passed to the routes
  People.routes(app, auth, database, circles);

  //We are adding a link to the main menu for all authenticated users
  People.menus.add({
    title: 'People List Page',
    link: 'people.list',
    roles: ['employee'],
    menu: 'main'
  });

  circles.registerCircle('employee', ['admin']);
  
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    People.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    People.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    People.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return People;
});

(function() {
  'use strict';

  function PeopleRoutes($stateProvider) {
    $stateProvider
      .state('people list page', {
        url: '/people',
        templateUrl: 'people/views/list-people.html',
        controller: 'PeopleController'
      });
  }

  angular
    .module('mean.people')
    .config(PeopleRoutes);

  PeopleRoutes.$inject = ['$stateProvider'];

})();

(function() {
  'use strict';

  function PeopleService($resource) {
    return $resource('api/people/:personId', {
      personId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  angular
    .module('mean.people')
    .factory('PeopleService', PeopleService);

  PeopleService.$inject = ['$resource'];

})();

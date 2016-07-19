(function() {
  'use strict';

  /* jshint -W098 */

  function PeopleListController($scope, PeopleService, $stateParams, MeanUser, $resource) {
    $scope.user = MeanUser;

    $scope.foobar = function () {
      $scope.people = PeopleService.query({
        full_name: $scope.full_name,
        url: $scope.url,
        email: $scope.email,
        job: $scope.job,
        location_safe: $scope.location_safe,
        phone: $scope.phone,
        notes: $scope.notes,
        keywords: $scope.keywords
      });
    };

    $scope.duplicates = function () {
      var Duplicates = $resource('/api/people/duplicates');
      $scope.people = Duplicates.query();
    };
  }

  angular
    .module('mean.people')
    .controller('PeopleListController', PeopleListController);

  PeopleListController.$inject = ['$scope', 'PeopleService', '$stateParams', 'MeanUser', '$resource'];

})();

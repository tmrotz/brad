(function() {
  'use strict';

  /* jshint -W098 */

  function PeopleListController($scope, PeopleService, $stateParams) {
    $scope.package = {
        name: 'people'
    };

    $scope.foobar = function () {
      $scope.people = PeopleService.query({keywords: $scope.keywords});
    };
  }

  angular
    .module('mean.people')
    .controller('PeopleListController', PeopleListController);

  PeopleListController.$inject = ['$scope', 'PeopleService', '$stateParams'];

})();

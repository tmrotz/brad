(function() {
  'use strict';

  /* jshint -W098 */

  function PeopleController($scope, Global, PeopleService, $stateParams) {
    $scope.global = Global;
    $scope.package = {
        name: 'people'
    };

    $scope.people = PeopleService.query();
  }

  angular
    .module('mean.people')
    .controller('PeopleController', PeopleController);

  PeopleController.$inject = ['$scope', 'Global', 'PeopleService', '$stateParams'];

})();

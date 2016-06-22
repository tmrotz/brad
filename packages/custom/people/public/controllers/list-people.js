(function() {
  'use strict';

  /* jshint -W098 */

  function PeopleListController($scope, Global, PeopleService, $stateParams) {
    $scope.global = Global;
    $scope.package = {
        name: 'people'
    };

    $scope.people = PeopleService.query();
  }

  angular
    .module('mean.people')
    .controller('PeopleListController', PeopleListController);

  PeopleListController.$inject = ['$scope', 'Global', 'PeopleService', '$stateParams'];

})();

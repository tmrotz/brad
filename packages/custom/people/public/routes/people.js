(function() {
  'use strict';

  function getPerson($stateParams, PeopleService) {     
    return PeopleService.get({                          
      personId: $stateParams.personId                   
    }).$promise;                                        
  }                                                     
                                                        
  getPerson.$inject = ['$stateParams', 'PeopleService'];
                                                        
  function newPerson(PeopleService) {                   
    return new PeopleService();                         
  }                                                     

  newPerson.$inject = ['PeopleService'];                
                                                        
  function PeopleRoutes($stateProvider) {
    $stateProvider
      .state('people', {
        abstract: true,
        url: '/people',
        template: '<ui-view/>'
      })
      .state('people.list', {
        url: '',
        templateUrl: 'people/views/list-people.html',
        controller: 'PeopleListController',
        data: {
          pageTitle: 'People List'
        },
        requiredCircles: {
          circles: ['employee']
        }
      })
      .state('people.create', {
        url: '/create',
        templateUrl: 'people/views/form-person.html',
        controller: 'PeopleController',
        controllerAs: 'vm',
        resolve: {
          personResolve: newPerson
        },
        data: {
          pageTitle: 'People Create'
        },
        requiredCircles: {
          circles: ['employee']
        }
      })
      .state('people.edit', {
        url: '/:personId/edit',
        templateUrl: 'people/views/form-person.html',
        controller: 'PeopleController',
        controllerAs: 'vm',
        resolve: {
          personResolve: getPerson
        },
        data: {
          pageTitle: 'Edit Person {{ personResolve.title }}'
        },
        requiredCircles: {
          circles: ['employee']
        }
      })
      .state('people.view', {
        url: '/:personId',
        templateUrl: 'people/views/view-person.html',
        controller: 'PeopleController',
        controllerAs: 'vm',
        resolve: {
          personResolve: getPerson
        },
        data: {
          pageTitle: 'Person {{ personResolve.title }}'
        },
        requiredCircles: {
          circles: ['employee']
        }
      });
  }

  angular
    .module('mean.people')
    .config(PeopleRoutes);

  PeopleRoutes.$inject = ['$stateProvider'];

})();

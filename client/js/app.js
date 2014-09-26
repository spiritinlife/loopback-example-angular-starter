'use strict';

angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('todo', {
        url: '',
        templateUrl: 'js/todo/templates/todo.html',
        controller: 'TodoCtrl'
      });
    $urlRouterProvider.otherwise('todo');
  }]);

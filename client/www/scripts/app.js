// Copyright StrongLoop 2014
var app = angular.module('app', [
  'ui.router',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'lbServices',
  'Home',
  'ui.utils'
]);
app.config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push('requestInterceptor');
  }
]);
app.config([
  '$stateProvider',
  '$urlRouterProvider',

  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.
      state('home', {
        url: '/',
        controller: 'HomeMainController',
        templateUrl: './scripts/modules/home/templates/home.main.html'
      });

  }
]);
app.factory('requestInterceptor', [
  '$q',
  '$rootScope',
  '$location',
  function ($q, $rootScope, $location) {
    return {
      'request': function (config) {
        if (window.localStorage.getItem('accessToken')) {
          config.headers.authorization = window.localStorage.getItem('accessToken');
        }
        return config || $q.when(config);
      },
      responseError: function(rejection) {
        console.log('intercepted rejection of ', rejection.config.url, rejection.status);
        if (rejection.status == 401) {
          //AppAuth.currentUser = null;
          // save the current location so that login can redirect back
          $location.nextAfterLogin = $location.path();
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  }
]);


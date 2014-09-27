'use strict';

angular
  .module('app')
  .controller('TodoCtrl', ['$scope', '$state', 'TodoService', function($scope,
      $state, TodoService) {
    $scope.todos = [];
    function getTodos() {
      TodoService
        .find()
        .$promise
        .then(function(results) {
          $scope.todos = results;
        });
    }
    getTodos();

    $scope.addTodo = function() {
      TodoService
        .create($scope.newTodo)
        .$promise
        .then(function(todo) {
          $scope.newTodo = '';
          $scope.todoForm.content.$setPristine();
          $('.focus').focus();
          getTodos();
        });
    };

    $scope.removeTodo = function(item) {
      TodoService
        .deleteById(item.id)
        .$promise
        .then(function() {
          getTodos();
        });
    };
  }]);

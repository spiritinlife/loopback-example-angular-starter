'use strict';

angular
  .module('app')
  .service('TodoService', ['Todo', function(Todo) {
    function find() {
      return Todo.find();
    }

    function create(obj) {
      return Todo.create(obj);
    }

    function deleteById(itemId) {
      return Todo.deleteById({id: itemId});
    }

    return {
      create: create,
      find: find,
      deleteById: deleteById,
    };
  }]);


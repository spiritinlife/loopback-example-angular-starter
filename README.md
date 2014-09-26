##Overview
This example demonstrates how to use [LoopBack](http://loopback.io) with [AngularJS](http://angularjs.org/).

##Prerequisites
Before starting, makes sure you've followed [Getting Started with LoopBack](http://docs.strongloop.com/display/LB/Getting+started+with+LoopBack) to install Node and LoopBack. You will also need to have Bower installed (`npm install -g bower`) as we use it pull in our front-end dependencies. In addition, you will need a basic understanding of:

- Angular
- Angular Resource
- AngularUI Router
- Bootstrap
- Bower
- [LoopBack models](http://docs.strongloop.com/display/LB/Working+with+models)

##Procedure
Follow the steps below to create the application from scratch. Doing this will give you a better understanding of how to implement AngularJS as a front-end solution for your LoopBack application.

Otherwise, if you just want to see the example in action, do this:
```
git clone https://github.com/strongloop/loopback-example-angular
cd loopback-example-angular
npm install
slc run
```

1. **Create the application**.

  Run `slc loopback`, and name the app `loopback-example-angular-starter`.

2. **Configure db.json.**

  Edit `server/datasources.json` to look like:
  ```
  {
    "db": {
      ...
      "file": "db.json"
    }
  }
  ```

  >This allows us to persist our model instances to a JSON file. For more information, see the [memory connector documentation](http://docs.strongloop.com/display/LB/Memory+connector#Memoryconnector-Datapersistance).

3. **Create the Todo model.**

  Run `slc loopback:model Todo` to create the Todo model. Use the (default) memory connector, expose the model via REST, leave the default plural form and give it the following property:

  |Property name|Property type|Required|
  |:-:|:-:|:-:|
  |content|String|Yes|

4. **Add a sample model.**

  Run `slc run` to start the server, go to http://localhost:3000/explorer and add a *Todo* instance with the following data:
  ```
  {
    "content": "Buy eggs"
  }
  ```
  Verify that model has been inserted by opening `db.json` (it will be created where you ran `slc run`). You should see this:
  ```
  {
    "ids": {
      "User": 1,
      "AccessToken": 1,
      "ACL": 1,
      "RoleMapping": 1,
      "Role": 1,
      "Todo": 2
    },
    "models": {
      "User": {},
      "AccessToken": {},
      "ACL": {},
      "RoleMapping": {},
      "Role": {},
      "Todo": {
        "1": "{\"content\":\"Buy eggs\",\"id\":1}"
      }
    }
  }
  ```

  >Notice the "Todo" property contains the model you just created.

5. **Configure the vendor directory.**

  Create `.bowerrc` in the project root with the following contents:
  ```
  {
    "directory": "client/vendor"
  }
  ```

  >Bower installs packages in `bower_components` by default, but we reconfigure this to `client/vendor` instead to make it easier to import files into `index.html`;

6. **Install our front-end dependencies.**

  Run the `bower install angular angular-resource angular-ui-router bootstrap` from the project root.

7. **Create index.html.**

  Create `index.html` in the `client` directory with the following contents:
  ```
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Bootstrap 101 Template</title>

      <!-- Bootstrap -->
      <link href="css/bootstrap.min.css" rel="stylesheet">

      <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
      <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
      <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
    </head>
    <body>
      <h1>Hello, world!</h1>

      <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
      <!-- Include all compiled plugins (below), or include individual files as needed -->
      <script src="js/bootstrap.min.js"></script>
    </body>
  </html>
  ```

  >This is just the basic Bootstrap [getting started template](http://getbootstrap.com/getting-started/).

8. **Create style.css.**

  Create a `css` directory inside the `client` directory. Inside the newly created directory, create a file named `style.css` with the following contents:
  ```
  body {
    padding-top:50px;
  }
  .glyphicon-remove:hover {
    cursor:pointer;
  }
  ```

9. **Add bower dependencies to index.html.**

  Modify `index.html` to look like:
  ```
  ...
  <title>LoopBack Angular starter example</title>
  ...
  <!-- Bootstrap -->
  <link href="vendor/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
  ...
  ```

  Next, replace the `body` tag and it's contents with the following contents:
  ```
  <body ng-app="app">
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">LoopBack Angular starter example</a>
        </div>
      </div>
    </div>

    <div class="container">
      <div ui-view></div>
    </div>

    <script src="vendor/jquery/dist/jquery.js"></script>
    <script src="vendor/bootstrap/dist/js/bootstrap.js"></script>
    <script src="vendor/angular/angular.js"></script>
    <script src="vendor/angular-resource/angular-resource.js"></script>
    <script src="vendor/angular-ui-router/release/angular-ui-router.js"></script>
  </body>
  ```

  >Use the minified versions of Bower dependencies for your production app.

10. **Configure index.html to be the application entry point.**

  Remove `server/boot/root.js` and modify `server/server.js` to look like:
  ```
  // -- Mount static files here--
  // All static middleware should be registered at the end, as all requests
  // passing the static middleware are hitting the file system
  // Example:
  var path = require('path');
  app.use(loopback.static(path.resolve(__dirname, '../client')));
  ```

11. **Create app.js and configure application routes.**

  In the `client` directory, create another directory named `js`. Inside the `js` directory, create a file named `app.js` with the following contents:
  ```
  'use strict';

  angular
    .module('app', [
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
  ```

  >For more information on application routing, see [AngularUI Router documentation](https://github.com/angular-ui/ui-router).

  >If you're using `jshint`, you can add `"predef": ['angular']` to `.jshintrc` to prevent Angular specific warnings.

  Then add `apps.js` as a dependency in `index.html`:
  ```
  ...
  <script src="vendor/angular-ui-router/release/angular-ui-router.js"></script>
  <script src="js/app.js"></script>
  ...
  ```

12. **Create todo.html.**

  In `client/js`, create a directory named `todo`. Inside the `todo` directory, create another directory named `templates`. In the `templates` directory, create a file named `todo.html` with the following contents:
  ```
  <h1>Todo list</h1>
  <hr>
  <form name="todoForm" novalidate ng-submit="addTodo()">
    <div class="form-group"
        ng-class="{'has-error': todoForm.content.$invalid
          && todoForm.content.$dirty}">
      <input type="text" class="form-control focus" name="content"
          placeholder="Content" autocomplete="off" required
          ng-model="newTodo.content">
      <span class="has-error control-label" ng-show="
          todoForm.content.$invalid && todoForm.content.$dirty">
        Content is required.
      </span>
    </div>
    <button class="btn btn-default" ng-disabled="todoForm.$invalid">Add</button>
  </form>
  <hr>
  <div class="list-group">
    <a class="list-group-item" ng-repeat="todo in todos">{{todo.content}}&nbsp;
      <i class="glyphicon glyphicon-remove pull-right"
          ng-click="removeTodo(todo)"></i></a>
  </div>
  ```

13. **Create controllers.js.**

  In `client/js/todo`, create `controllers.js` with the following contents:
  ```
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
  ```

  Then add `controllers.js` as a dependency in `index.html`:
  ```
  ...
  <script src="js/app.js"></script>
  <script src="js/todo/controllers.js"></script>
  ...
  ```

14. **Create services.js.**

  In `client/js/todo`, create `services.js` with the following contents:
  ```
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
  ```

  Then add `services.js` as a dependency in `index.html`:
  ```
  ...
  <script src="js/todo/controllers.js"></script>
  <script src="js/todo/services.js"></script>
  ...
  ```

15. **Generate lb-services.js.**

  Create a new directory named `common` in `client/js`. Switch to the `common` directory and run `lb-ng ../../../server/server.js lb-services.js`.

  >This generates a file named `lb-services.js` which is an Angular service used to interface with your back-end server. For more information, see the [LoopBack AngularJS SDK](http://docs.strongloop.com/display/LB/AngularJS+JavaScript+SDK#AngularJSJavaScriptSDK-Setup).

  Next, declare `lbServices` as a dependency in `client/js/app.js`:
  ```
  ...
  angular
    .module('app', [
      'lbServices',
      'ui.router'
    ])
    ...
  ```

  Then add `lb-services.js` as a dependency in `index.html`:
  ```
  ...
  <script src="js/todo/services.js"></script>
  <script src="js/common/lb-services.js"></script>
  ...
  ```

16. **Run the application.**

  From the project root, run `slc run` and browse to [localhost:3000](http://localhost:3000) to view the application.

##More information
For more information, see the [LoopBack Angular SDK documentation](http://docs.strongloop.com/display/LB/AngularJS+JavaScript+SDK).

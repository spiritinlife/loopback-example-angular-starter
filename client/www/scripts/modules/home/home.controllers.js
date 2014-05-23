// Copyright StrongLoop 2014
Home.controller('HomeMainController', [
  '$scope',
  '$state',
  '$stateParams',
  'HomeService',
  function($scope, $state, $stateParams, HomeService) {
    console.log('Home Main Controller');


    $scope.currModel = {};
    $scope.examples = [];

    $scope.submitForm = function(isValid) {

      if (isValid){
        var newModel = HomeService.createNewModel($scope.currModel);
        newModel.$promise.
          then(function (result) {

            $scope.currModel = {};

            loadExamples();

          }
        );
      }




    };

    $scope.deleteItem = function(item) {
      if (confirm('delete item?')) {


        var delModel = HomeService.deleteItem(item);
        delModel.$promise.
          then(function (result) {

            loadExamples();

          });
      }
    }



    function loadExamples() {

      var exs = HomeService.getExampleModels();
      exs.$promise.
        then(function (result) {

          $scope.examples = result;


        }
      );


    }
    loadExamples();

  }
]);
Home.controller('HomeInstanceController', [
  '$scope',
  '$state',
  '$stateParams',
  function($scope, $state, $stateParams) {
    var exampleName = $stateParams.name;
    $scope.exampleName = exampleName;
    console.log('Home Instance: ' + exampleName);
  }

]);

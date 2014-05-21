// Copyright StrongLoop 2014
Home.controller('HomeMainController', [
  '$scope',
  '$state',
  '$stateParams',
  'HomeService',
  function($scope, $state, $stateParams, HomeService) {
    console.log('Home Main Controller');




    $scope.examples = [];
    var exs = HomeService.getExampleModels();
    exs.$promise.
      then(function (result) {

        $scope.examples = result[0];


      });

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

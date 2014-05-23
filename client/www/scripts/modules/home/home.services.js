// Copyright StrongLoop 2014
Home.service('HomeService', [
  'ExampleModel',
  function(ExampleModel) {
    var svc = {};

    svc.createNewModel = function(obj){
      return ExampleModel.create(obj, function(response) {
        console.log('good add new record');
      },
      function(response) {
        console.log('error adding record');
      });
    };
    svc.getExampleModels = function(){
      return ExampleModel.query({});
    };
    svc.getMostPopularExampleModels = function(){
      var filter = {
        where:{score:10}
      };
      return ExampleModel.query(filter);
    };
    svc.deleteItem = function(item) {
      return ExampleModel.deleteById({id:item.id});
    };

    return svc;
  }
]);

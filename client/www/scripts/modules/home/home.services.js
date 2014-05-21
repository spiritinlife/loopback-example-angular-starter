// Copyright StrongLoop 2014
Home.service('HomeService', [
  'ExampleModel',
  function(ExampleModel) {
    var svc = {};

    svc.getExampleModels = function(){
      return ExampleModel.query({});
    };
    svc.getMostPopularExampleModels = function(){
      var filter = {
        where:{score:10}
      };
      return ExampleModel.query(filter);
    };

    return svc;
  }
]);

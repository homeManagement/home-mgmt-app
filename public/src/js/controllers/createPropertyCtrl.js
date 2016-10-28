angular.module('mgmtApp')
.controller('createPropertyCtrl', function($scope, mainService, $stateParams){


  $scope.property = {
    userId: $stateParams.userId
};

  $scope.send = function(property){
    mainService.createProperty(property).then(function(res){
      console.log('new prop id',res);
    });
  }

})

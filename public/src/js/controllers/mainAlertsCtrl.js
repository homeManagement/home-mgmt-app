angular.module('mgmtApp')
.controller('mainAlertsCtrl', function($scope, mainService, $stateParams){

  $scope.getPropertyTasks = function(propertyId){
    mainService.getPropertyTasks(propertyId)
    .then(function(res){
      $scope.propertyTasks = res;
    })
  }
  $scope.getPropertyTasks($stateParams.propertyId)
  $scope.propertyId = $stateParams.propertyId;

})

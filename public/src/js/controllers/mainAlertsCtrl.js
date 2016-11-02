angular.module('mgmtApp')
.controller('mainAlertsCtrl', function($scope, mainService, $stateParams, $window){
  if ($stateParams.propertyId) {
    $window.localStorage.propertyId = $stateParams.propertyId;
    $scope.propertyId = $stateParams.propertyId;
  }
  else if (!$stateParams.propertyId) {
   $scope.propertyId = $window.localStorage.propertyId
 }

  $scope.getPropertyTasks = function(propertyId){
    mainService.getPropertyTasks(propertyId)
    .then(function(res){
      $scope.propertyTasks = res;
    })
  }

  $scope.getPropertyTasks($scope.propertyId)

  $scope.done = function(propertymaintenanceid, alertid){
    mainService.done(propertymaintenanceid, alertid)
    .then(function(res){
      $scope.getPropertyTasks($scope.propertyId)
    })
  }
  $scope.snooze = function(alertid) {
    mainService.snooze(alertid)
    .then(function(res) {
      $scope.getPropertyTasks($scope.propertyId)
    })
  }
})

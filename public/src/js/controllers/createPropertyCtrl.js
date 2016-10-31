angular.module('mgmtApp')
.controller('createPropertyCtrl', function($scope, mainService, $window){

  $scope.propertyFromVisibility = true;
  $scope.taskSelectionVisibility = false;

  $scope.property = {
    token: $window.localStorage.satellizer_token
  };

  $scope.send = function(property){
    mainService.createProperty(property).then(function(res){
      $scope.propertyId = res[0]["id"]
      $scope.propertyFromVisibility = false;
      $scope.taskSelectionVisibility = true;

      mainService.getDefaultTasks($scope.propertyId).then(function(res){
        $scope.tasks = res;
      })
    });
  }

  $scope.createTasks = function(tasks) {
    var selectedTask = tasks.filter(function(currentValue){
      currentValue.propertyId = $scope.propertyId;
      return currentValue.selected !== false;
    })
    mainService.insertTasks(selectedTask).then(function(res){
      // $state.go('')
    })
  }
})

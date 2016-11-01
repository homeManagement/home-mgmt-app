angular.module('mgmtApp')
.controller('propertiesCtrl', function($scope, $window, mainService, $swipe){

  $scope.propDeleteButtonVisibility = false;
  $scope.propDeleteConfirmVisiblity = false;

  $scope.getProperties = function(token){
    mainService.getProperties(token)
    .then(function(res){
      $scope.properties = res;
    })
  }
  $scope.getProperties($window.localStorage.satellizer_token)

  $scope.deleteProperty = function(propertyId){
    mainService.deleteProperty(propertyId).then(function(res){
      $scope.properties = $scope.properties.filter(function(currentProp){
        return currentProp.id !== propertyId
      });
    })
  }

})

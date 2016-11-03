angular.module('mgmtApp')
.controller('userSettingsCtrl', function($scope, mainService, $window){

  $scope.getUserById = function(token){
    mainService.getUserById(token)
    .then(function(res){
      $scope.user = res[0];
    })
  }
  $scope.getUserById($window.localStorage.satellizer_token)

  $scope.updateFirstName = function(newFirstName){
    mainService.updateFirstName($scope.user.id, newFirstName)
    .then(function (res){
     $scope.user.firstname = newFirstName;
     $scope.firstNameEdit = false;
     $scope.newFirstName = "";
    })
  }


})

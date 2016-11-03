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
  $scope.updateLastName = function(newLastName){
    mainService.updateLastName($scope.user.id, newLastName)
    .then(function (res){
     $scope.user.last_name = newLastName;
     $scope.lastNameEdit = false;
     $scope.newLastName = "";
    })
  }
/////////////////////edit phone number to (xXx)xXX-XXXX/////////////
  $scope.phoneNumberStyle = function(e){

     if ($scope.newPhone.length === 1) {
       $scope.newPhone = '(' + $scope.newPhone
     }
     if (!Number.isInteger(Number(e.key))) {
       $scope.newPhone = $scope.newPhone.split('').splice(0,$scope.newPhone.length - 1).join('')
     }
     if ($scope.newPhone.length === 4) {
       $scope.newPhone = $scope.newPhone + ')'
     }
     if ($scope.newPhone.length === 8) {
       $scope.newPhone = $scope.newPhone + '-'
     }
     if ($scope.newPhone.length === 14) {
       $scope.newPhone = $scope.newPhone.split('').splice(0,$scope.newPhone.length - 1).join('')
     }
   }

  $scope.updatePhone = function(newPhone){
      newPhone = newPhone.replace(/\D/g,'');
    mainService.updatePhone($scope.user.id, newPhone)
    .then(function (res){
     $scope.user.phone_number = newPhone;
     $scope.phoneEdit = false;
     $scope.newPhone = "";
    })
  }

  $scope.updatePassword = function(newPassword){
    mainService.updatePassword($scope.user.id, newPassword)
    .then(function (res){
     $scope.user.password = newPassword;
     $scope.newPassword = "";
    })
  }


})

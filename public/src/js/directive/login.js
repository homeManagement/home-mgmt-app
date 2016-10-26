angular.module('mgmtApp').directive('loginDirective', function(){

var controller = function($scope, $window, $location, $rootScope, $auth){
  $scope.authenticate = function(provider) {
    // localStorage.clear();
    $auth.authenticate(provider)
    .then(function(response){
      console.log(response.data);
      // $window.localStorage.currentUser = JSON.stringify(response.data.user);
      // $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);

    })
    .catch(function(response) {
      console.log(response.data);
    });
  };

  $scope.emailLogin = function() {
       $auth.login({ email: $scope.email, password: $scope.password })
         .then(function(response) {
           $window.localStorage.currentUser = JSON.stringify(response.data.user);
           $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
         })
         .catch(function(response) {
           console.log(response);
           $scope.errorMessage = {};
           angular.forEach(response.data.message, function(message, field) {
             console.log(field);
             $scope.loginForm[field].$setValidity('server', false);
             $scope.errorMessage[field] = response.data.message[field];
           });
         });
     };
}



return{
  restrict: 'AE',
  controller: controller,
  templateUrl: '../src/view/template/login.html'

}


})

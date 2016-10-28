angular.module('mgmtApp').directive('loginDirective', function(){

var controller = function($scope, $window, $state, $auth){
  $scope.authenticate = function(provider) {
    // localStorage.clear();
    $auth.authenticate(provider)
    .then(function(response){
      console.log(response.data);
      $state.go('properties')
    })
    .catch(function(response) {
      console.log(response.data);
    });
  };

  $scope.emailLogin = function() {
       $auth.login({ email: $scope.email, password: $scope.password })
         .then(function(response) {
           $state.go('properties')
         })
         .catch(function(response) {
           console.log(response);
           $scope.errorMessage = {};
           $scope.loginForm["email"].$setValidity('server', false);
           $scope.errorMessage["email"] = response.data.message;
         });
     };
}



return{
  restrict: 'AE',
  controller: controller,
  templateUrl: '../src/view/template/login_template.html'

}


})

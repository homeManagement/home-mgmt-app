angular.module('mgmtApp').directive('signupDirective', function(){

var controller = function($scope, $auth, $state){
  $scope.signUp = function() {
    var user = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      password: $scope.password
    };
    console.log(user);
    $auth.signup(user)
      .then(function(response){
        console.log(response.data);
        $auth.login({ email: $scope.email, password: $scope.password })
          .then(function(response) {
            $state.go('properties')
          })
      })
      .catch(function(response){
        console.log(response.data);
        $scope.errorMessage = {};
        $scope.loginForm["email"].$setValidity('server', false);
        $scope.errorMessage["email"] = response.data.message;
      });

  }
  $scope.showSignUp = function () {
      $scope.modalSignUpFunc = !$scope.modalSignUpFunc;
      console.log('firing')
    }
}



return{
  restrict: 'AE',
  controller: controller,
  templateUrl: '../src/view/template/signup_template.html'

}


})

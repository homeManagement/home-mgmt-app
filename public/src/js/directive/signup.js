angular.module('mgmtApp').directive('signupDirective', function(){

var controller = function($scope, $auth, $state){
  $scope.signUp = function() {
    var user = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      password: $scope.password
    };
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
      });

  }
}



return{
  restrict: 'AE',
  controller: controller,
  templateUrl: '../src/view/template/signup.html'

}


})

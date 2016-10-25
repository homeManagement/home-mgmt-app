angular.module('mgmtApp').directive('signupDirective', function(){

var controller = function($scope, $auth){
  $scope.signUp = function() {
    var user = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      password: $scope.password
    };
    console.log(user);
    $auth.signup(user)
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

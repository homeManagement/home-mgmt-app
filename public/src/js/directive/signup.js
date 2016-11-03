angular.module('mgmtApp').directive('signupDirective', function(){

var controller = function($scope, $auth, $state){
    $scope.phoneNumberStyle = function(e){

   if ($scope.phone.length === 1) {
     $scope.phone = '(' + $scope.phone
   }
   if (!Number.isInteger(Number(e.key))) {
     $scope.phone = $scope.phone.split('').splice(0,$scope.phone.length - 1).join('')
   }
   if ($scope.phone.length === 4) {
     $scope.phone = $scope.phone + ')'
   }
   if ($scope.phone.length === 8) {
     $scope.phone = $scope.phone + '-'
   }
   if ($scope.phone.length === 14) {
     $scope.phone = $scope.phone.split('').splice(0,$scope.phone.length - 1).join('')
   }
 }

  $scope.signUp = function() {
    var user = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      password: $scope.password,
      phone: $scope.phone
    };

    console.log(user);
    $auth.signup(user)
      .then(function(response){
        //console.log(response.data);
        $auth.login({ email: $scope.email, password: $scope.password })
          .then(function(response) {
            $state.go('properties')
          })
      })
      .catch(function(response){
        //console.log(response.data);
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

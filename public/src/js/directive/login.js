angular.module('homeMgmt').directive('loginDirective', function(){

var controller = function($scope, $auth){
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider);
  };
}

return{
  restrict: 'AE',
  controller: controller,
  templateUrl: '../src/view/template/login.html'

}


})

angular.module('mgmtApp').directive('logoutDirective', function(){

var controller = function($scope, $auth, $window, $state){
  $scope.logout = function(){
    $auth.logout();
    $state.go('home');
    
  }
}



return{
  restrict: 'AE',
  controller: controller,
  template: '<button style="font-size: 3.5rem;" class="logout-btn" type="button" ng-click="logout()">logout</button>'

}


})

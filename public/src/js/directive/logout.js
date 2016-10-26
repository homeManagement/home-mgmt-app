angular.module('mgmtApp').directive('logoutDirective', function(){

var controller = function($scope, $auth){
  $scope.logout = function(){
    console.log('logout 1',$window.localStorage)
    $auth.logout();
    console.log('logout 2',$window.localStorage)
  }
}



return{
  restrict: 'AE',
  controller: controller,
  template: '<button type="button" ng-click="logout()">logout</button>'

}


})

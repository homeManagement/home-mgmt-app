angular.module('mgmtApp')
.controller('propertiesCtrl', function($scope, $window, mainService){

$scope.getProperties = function(token){
  mainService.getProperties(token)
}
$scope.getProperties($window.localStorage.satellizer_token)

})

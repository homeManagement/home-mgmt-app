angular.module('mgmtApp')
.controller('propertiesCtrl', function($scope, $window, mainService){

$scope.getProperties = function(token){
  mainService.getProperties(token)
  .then(function(res){
    $scope.properties = res;
  })
}
$scope.getProperties($window.localStorage.satellizer_token)

})

angular.module('mgmtApp')
.controller('propertiesCtrl', function($scope, $window, mainService){

$scope.getProperties = function(token){
  mainService.getProperties(token)
  .then(function(res){
    $scope.properties = res;
    $scope.userId = $scope.properties[0]["user_id"]
  })
}
$scope.getProperties($window.localStorage.satellizer_token)

})

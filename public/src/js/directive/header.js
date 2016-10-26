angular.module('mgmtApp')
.directive('headerDirective', function() {
  var controller = function($scope) {
    $scope.showLogin = function () {
        $scope.modalFunc = !$scope.modalFunc;
        console.log('firing')
      }
  }

  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/header.html'
  }


})

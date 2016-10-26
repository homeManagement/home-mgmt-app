angular.module('mgmtApp')
.directive('headerDirective', function() {
  var controller = function($scope) {

  }

  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/header.html'
  }


})

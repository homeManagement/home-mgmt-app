angular.module('mgmtApp')
.directive('headerDirective', function() {
  var controller = function($scope, $state, mainService, $rootScope) {
    $scope.showLogin = function () {
        $scope.modalFunc = !$scope.modalFunc;
        console.log('firing')
      }
      $scope.menuShowing = false;
      $scope.showMenu = function() {

        $scope.menuShowing = !$scope.menuShowing;
        console.log($scope.menuShowing);
      }

      $scope.hideMenu = function() {
        $scope.menuShowing = false;
      }

      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, options){
          console.log($state.current.name);
          $scope.viewname = $state.current.name;
       })

       $('#bounceMenu').addClass('animated slideInDown');

  }

  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/header.html'
  }


})

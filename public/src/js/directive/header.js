angular.module('mgmtApp')
.directive('headerDirective', function() {
  var controller = function($scope, $state, mainService, $rootScope) {
    $scope.showLogin = function () {
        $scope.modalFunc = !$scope.modalFunc;
        console.log('firing')
      }
      $scope.menuShowing = false;
      $scope.toggleMenu = function() {

        $scope.menuShowing = !$scope.menuShowing;
        console.log($scope.menuShowing);
      }


      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, options){
        //  console.log($state.current.name);
          $scope.viewname = $state.current.name;
       })


     };




  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/header.html'
  }


})

angular.module('mgmtApp')
.directive('headerDirective', function() {
  var controller = function($scope, $state, mainService, $rootScope) {
    $scope.showLogin = function () {
        $scope.modalFunc = !$scope.modalFunc;
        console.log('firing')
      }
      $scope.menuShowing = false;
      $scope.toggleMenu = function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        if (!$scope.menuShowing) {
            $('div.menu').addClass('animated slideInDown').one(animationEnd, function () {
              $(this).removeClass('animated slideInDown')
            });
        }
        else {
              $('div.menu').addClass('animated slideOutUp').one(animationEnd, function () {
                $(this).removeClass('animated slideOutUp')
            })
        }
        $scope.menuShowing = !$scope.menuShowing;
        console.log($scope.menuShowing);
      }


      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, options){
          console.log($state.current.name);
          $scope.viewname = $state.current.name;
       })


     };




  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/header.html'
  }


})

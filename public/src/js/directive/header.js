angular.module('mgmtApp')
.directive('headerDirective', function() {
  var controller = function($scope, $state, mainService, $rootScope) {

    // menu icon animation

    $(document).ready(function(){
	$('#nav-icon3').click(function(){
		$(this).toggleClass('open');
	});
});



    // menu dropdown animationm
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
                $(this).prev().find('#nav-icon3').removeClass('open')
                $(this).removeClass('animated slideOutUp')

            })
        }
        $scope.menuShowing = !$scope.menuShowing;
        // console.log($scope.menuShowing);
      }
      $scope.closeMenu = function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        if ($scope.menuShowing) {
          $('div.menu').addClass('animated slideOutUp').one(animationEnd, function () {
            $(this).prev().find('#nav-icon3').removeClass('open')
            $(this).removeClass('animated slideOutUp')

        });
        }
        $scope.menuShowing = false;
      }


      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, options){
        //  console.log($state.current.name);
          switch($state.current.name) {
              case 'home':
                  $scope.viewname = '';
                  break;
              case 'properties':
                  $scope.viewname = 'Your Properties';
                  break;
              case 'createProperty':
                  $scope.viewname = 'Property Create';
                  break;
              case 'mainAlerts':
                  $scope.viewname = 'Upcoming Maintenance';
                  break;
              case 'userSettings':
                  $scope.viewname = 'User Settings';
                  break;
              case 'propertySettings':
                  $scope.viewname = 'Property Settings';
                  break;
              case 'contact':
                  $scope.viewname = 'About';
                  break;
              case 'login':
                  $scope.viewname = 'Login';
                  break;
              case 'signup':
                  $scope.viewname = 'Signup';
                  break;
              default:
                  $scope.viewname = ''
          }
       })


     };




  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/header.html'
  }


})

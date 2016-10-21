'use strict';

angular.module('homeMgmt', ['satellizer']).config(function ($authProvider) {
  $authProvider.facebook({
    clientId: '210265252729339',
    responseType: 'token'
  });
});

angular.module('homeMgmt').directive('loginDirective', function () {

  var controller = function controller($scope, $auth) {
    $scope.authenticate = function (provider) {
      $auth.authenticate(provider);
    };
  };

  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/login.html'

  };
});
//# sourceMappingURL=all.js.map

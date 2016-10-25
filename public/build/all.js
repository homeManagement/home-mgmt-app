'use strict';

angular.module('homeMgmt', ['satellizer']).config(function ($authProvider) {
  $authProvider.loginUrl = '/auth/login';
  $authProvider.signUpUrl = '/auth/signup';
  $authProvider.facebook({
    clientId: '1730897763901303',
    responseType: 'code',
    name: 'facebook',
    url: '/auth/facebook',
    authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
    // redirectUri: window.location.origin + '/',
    requiredUrlParams: ['scope'],
    scope: ['email'],
    scopeDelimiter: ',',
    display: 'popup',
    oauthType: '2.0',
    popupOptions: { width: 580, height: 400 }
  });
}).run(function ($rootScope, $window, $auth) {
  console.log($window.localStorage.currentUser);
});

angular.module('homeMgmt').directive('loginDirective', function () {

  var controller = function controller($scope, $auth) {
    $scope.authenticate = function (provider) {
      // localStorage.clear();
      $auth.authenticate(provider).then(function (response) {
        console.log(response);
      });
    };

    $scope.emailLogin = function () {
      $auth.login({ email: $scope.email, password: $scope.password }).then(function (response) {
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
      }).catch(function (response) {
        $scope.errorMessage = {};
        angular.forEach(response.data.message, function (message, field) {
          $scope.loginForm[field].$setValidity('server', false);
          $scope.errorMessage[field] = response.data.message[field];
        });
      });
    };
  };

  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/login.html'

  };
});
//# sourceMappingURL=all.js.map

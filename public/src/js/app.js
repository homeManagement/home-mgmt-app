
angular.module('mgmtApp', ['ui.router', 'satellizer'])
.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider

  .state('properties', {
    url: "/properties" ,
    controller:  'propertiesCtrl',
    templateUrl: '../src/view/properties.html'
  })
  .state('createProperty', {
    url: "/createProperty",
    controller: 'createPropertyCtrl',
    templateUrl: '../src/view/createProperty.html'
  })
  .state('mainAlerts', {
    url: "/mainAlerts",
    controller: 'mainAlertsCtrl',
    templateUrl: '../src/view/mainAlerts.html'
  })
  .state('userSettings', {
    url: "/userSettings",
    controller: 'userSettingsCtrl',
    templateUrl: '../src/view/userSettings.html'
  })
  .state('propertySettings', {
    url: "/propertySettings",
    controller: 'propertySettingsCtrl',
    templateUrl: '../src/view/propertySettings.html'
  })
  .state('contact', {
    url: "/contact",
    controller: 'contactCtrl',
    templateUrl: '../src/view/contact.html'
  })
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
  })
   .run(function($rootScope, $window, $auth){
      console.log($window.localStorage.currentUser);



})

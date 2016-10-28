
angular.module('mgmtApp', ['ui.router', 'satellizer'])
.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider

  .state('home', {
    url: "/" ,
    controller:  'homeCtrl',
    templateUrl: '../src/view/home.html',
    restricted: false
  })
  .state('properties', {
    url: "/properties" ,
    controller:  'propertiesCtrl',
    templateUrl: '../src/view/properties.html',
    restricted: true
  })
  .state('create property', {
    url: "/createProperty",
    controller: 'createPropertyCtrl',
    templateUrl: '../src/view/createProperty.html',
    restricted: true
  })
  .state('mainAlerts', {
    url: "/mainAlerts",
    controller: 'mainAlertsCtrl',
    templateUrl: '../src/view/mainAlerts.html',
    restricted: true
  })
  .state('userSettings', {
    url: "/userSettings",
    controller: 'userSettingsCtrl',
    templateUrl: '../src/view/userSettings.html',
    restricted: true
  })
  .state('propertySettings', {
    url: "/propertySettings",
    controller: 'propertySettingsCtrl',
    templateUrl: '../src/view/propertySettings.html',
    restricted: true
  })
  .state('contact', {
    url: "/contact",
    controller: 'contactCtrl',
    templateUrl: '../src/view/contact.html',
    restricted: false
  })
  .state('log in', {
    url: "/login",
    templateUrl: '../src/view/login.html',
    restricted: false
  })
  .state('sign up', {
    url: "/signup",
    templateUrl: '../src/view/signup.html',
    restricted: false
  })
  $authProvider.loginUrl = '/auth/login';
  $authProvider.signUpUrl = '/auth/signup';
  $authProvider.facebook({
    clientId: '1730897763901303',
    responseType: 'code',
    name: 'facebook',
    url: '/auth/facebook',
    authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
    redirectUri: window.location.origin + '/properties',
    requiredUrlParams: ['scope'],
    scope: ['email'],
    scopeDelimiter: ',',
    display: 'popup',
    oauthType: '2.0',
    popupOptions: { width: 580, height: 400 }
  });
  })
   .run(function($rootScope, $state, $window, $auth){
     $rootScope.$on('$stateChangeStart', function(e, to) {
       console.log('$auth.isAuthenticated',$auth.isAuthenticated());
       console.log('$window.localStorage',$window.localStorage);
       if (!to.restricted) return;

       if ($auth.isAuthenticated()) return;
       else $state.go('home');


     });
})

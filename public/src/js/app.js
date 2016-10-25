angular.module('mgmtApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('login', {
    url: "/",
    controller: 'loginCtrl',
    templateUrl: '../src/view/login.html'
  })
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

})

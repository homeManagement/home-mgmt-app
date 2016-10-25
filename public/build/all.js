'use strict';

angular.module('mgmtApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('login', {
    url: "/",
    controller: 'loginCtrl',
    templateUrl: '../src/view/login.html'
  }).state('properties', {
    url: "/properties",
    controller: 'propertiesCtrl',
    templateUrl: '../src/view/properties.html'
  }).state('createProperty', {
    url: "/createProperty",
    controller: 'createPropertyCtrl',
    templateUrl: '../src/view/createProperty.html'
  }).state('mainAlerts', {
    url: "/mainAlerts",
    controller: 'mainAlertsCtrl',
    templateUrl: '../src/view/mainAlerts.html'
  }).state('userSettings', {
    url: "/userSettings",
    controller: 'userSettingsCtrl',
    templateUrl: '../src/view/userSettings.html'
  }).state('propertySettings', {
    url: "/propertySettings",
    controller: 'propertySettingsCtrl',
    templateUrl: '../src/view/propertySettings.html'
  }).state('contact', {
    url: "/contact",
    controller: 'contactCtrl',
    templateUrl: '../src/view/contact.html'
  });
});

angular.module('mgmtApp').service('mainService', function ($http) {});

angular.module('mgmtApp').controller('contactCtrl', function ($scope, mainService) {});

angular.module('mgmtApp').controller('createPropertyCtrl', function ($scope, mainService) {});

angular.module('mgmtApp').controller('loginCtrl', function ($scope, mainService) {});

angular.module('mgmtApp').controller('mainAlertsCtrl', function ($scope, mainService) {});

angular.module('mgmtApp').controller('propertiesCtrl', function ($scope, mainService) {});

angular.module('mgmtApp').controller('propertySettingsCtrl', function ($scope, mainService) {});

angular.module('mgmtApp').controller('userSettingsCtrl', function ($scope, mainService) {});
//# sourceMappingURL=all.js.map

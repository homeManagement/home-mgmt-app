angular.module('homeMgmt', ['satellizer'])
.config(function($authProvider) {
  $authProvider.facebook({
    clientId: '210265252729339',
    responseType: 'token'
  });
})

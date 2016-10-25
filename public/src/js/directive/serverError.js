angular.module('mgmtApp')
 .directive('serverError', function() {
   return {
       restrict: 'A',
       require: 'ngModel',
       link: function(scope, element, attrs, ctrl) {
         element.on('keydown', function() {
           ctrl.$setValidity('server', true)
         });
       }
   }
 });

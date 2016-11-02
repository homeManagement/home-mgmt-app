angular.module('mgmtApp').directive('editTasks', function($stateParams){

var controller = function($scope, mainService, $window){
  if (!$stateParams.propertyId) {
   $scope.propertyId = $window.localStorage.propertyId
 }
 else {
   $scope.propertyId = $stateParams.propertyId
 }

 mainService.getPropertyTasks($scope.propertyId).then(function(res){
   $scope.tasks = res
 })

}



return{
  restrict: 'AE',
  controller: controller,
  templateUrl: '../src/view/template/editTasks_template.html'

}


})

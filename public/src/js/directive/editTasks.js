angular.module('mgmtApp').directive('editTasks', function($stateParams){

var controller = function($scope, mainService, $window){
  if (!$stateParams.propertyId) {
   $scope.propertyId = $window.localStorage.propertyId
 }
 else {
   $scope.propertyId = $stateParams.propertyId
 }

 $scope.editFormVisibility = false;

 mainService.getPropertyTasks($scope.propertyId).then(function(res){
   res.map(function(currentValue){
     currentValue.nextdate = currentValue.nextdate.substr(0,10);
     currentValue.lastdate = currentValue.lastdate.substr(0,10);
   })
   $scope.tasks = res;
 })

}



return{
  restrict: 'AE',
  controller: controller,
  templateUrl: '../src/view/template/editTasks_template.html'

}


})

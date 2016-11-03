angular.module('mgmtApp').directive('editTasks', function($stateParams){

var controller = function($scope, mainService, $window){
  if (!$stateParams.propertyId) {
   $scope.propertyId = $window.localStorage.propertyId
 }
 else {
   $scope.propertyId = $stateParams.propertyId
 }

 $scope.editFormVisibility = false;
 $scope.taskOverlayVisibility = false;

 mainService.getPropertyTasks($scope.propertyId).then(function(res){
   res.map(function(currentValue){
     currentValue.nextdate = currentValue.nextdate.substr(0,10);
     currentValue.lastdate = currentValue.lastdate.substr(0,10);
   })
   $scope.tasks = res;
 })

  $scope.deleteTask = function(propertymaintenanceid){
    mainService.deleteTask(propertymaintenanceid).then(function(res){
      $scope.tasks = $scope.tasks.filter(function(currentValue){
        return currentValue.propertymaintenanceid !== propertymaintenanceid;
      })
    })
  }

  $scope.createTask = function(propertyId,task) {
    if(!propertyId){
      task.propertyId = $window.localStorage.propertyId;
    }
    else {
      task.propertyId = propertyId
    }

    switch (task.season) {
      case 'Monthly':
          task.dayInterval = 30;
          break;
      case 'Quarterly':
          task.dayInterval = 90;
          break;
      case 'Biannually':
          task.dayInterval = 182;
          break;
      case 'Annually':
          task.dayInterval = 365;
          break;
      default:
          task.dayInterval = task.dayInterval
      }

    mainService.createCustomTask(task).then(function(res){
      var newTask = res.data[0]
      newTask["dayinterval"] = newTask["day_interval"];
      newTask["nextdate"] = newTask["next_date"].substr(0,10);
      newTask["lastdate"] = newTask["last_date"].substr(0,10);
      delete newTask["next_date"];
      delete newTask["last_date"];

      $scope.tasks.push(newTask)

      $scope.newTask = {
        name: null,
        season: null,
        lastDate: null,
        dayInterval: null,
        outdoor: false,
        notes: null
      }
    })
  }

}



return{
  restrict: 'AE',
  controller: controller,
  templateUrl: '../src/view/template/editTasks_template.html'

}


})

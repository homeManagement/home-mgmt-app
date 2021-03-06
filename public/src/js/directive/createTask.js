angular.module('mgmtApp').directive('createTask', function(mainService,$window){

var controller = function(scope, element){
  scope.task = {
    season: 'Monthly'
  }

  scope.createTask = function(propertyId,task) {
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

      element.after('<div class="custom-task"><div class="custom-task-title">'+scope.task.name+'</div>')
      //+'</div><span>'+scope.task.lastDate+'</span><span>'+scope.task.season+'</span><span>'+scope.task.dayInterval+'</span><span>'+scope.task.outdoor+'</span><span>'+scope.task.notes+'</span>

      scope.task = {
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
  scope: {
    propertyId: '='
  },
  templateUrl: '../src/view/template/createTask_template.html',
  link: controller

}


})

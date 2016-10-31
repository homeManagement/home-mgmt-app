angular.module('mgmtApp').directive('createTask', function(mainService){

var controller = function(scope, element){
  scope.task = {
    season: 'Monthly'
  }

  scope.createTask = function(propertyId,task) {
    task.propertyId = propertyId
    console.log(task);


    mainService.createCustomTask(task).then(function(res){

      console.log('the is the response',res);

      element.after('<div class="custom-task"><span>'+scope.task.name+'</span><span>'+scope.task.lastDate+'</span><span>'+scope.task.season+'</span><span>'+scope.task.dayInterval+'</span><span>'+scope.task.outdoor+'</span><span>'+scope.task.notes+'</span></div>')

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

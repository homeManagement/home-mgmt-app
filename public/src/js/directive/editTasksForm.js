angular.module('mgmtApp').directive('editTasksForm', function(mainService){

var link = function(scope){

  scope.editTask = function(task){
    if (!task) {
      task = {};
    }
    task["inactive"] = scope.task.inactive;
    task["outdoor"] = scope.task.outdoor;
    task["season"] = scope.task.season;
    mainService.editTask(scope.task.propertymaintenanceid, task).then(function(res){
      if (res) {
        scope.task.name = res.data[0]["name"]

        scope.task.lastdate = res.data[0]["last_date"].substr(0,10)

        scope.task.nextdate = res.data[0]["next_date"].substr(0,10)

        if(!scope.editTaskObj) {
          scope.editTaskObj = {};
        }

        scope.editTaskObj.maintName = '';
        scope.editTaskObj.lastDate = '';
        scope.editTaskObj.nextDate = '';
        scope.editTaskObj.season = '';
        scope.editTaskObj.dayInterval = '';
        scope.editTaskObj.outdoor = '';
        scope.editTaskObj.notes = '';
        scope.editTaskObj.inactive = '';
      }

    })
  }

}



return{
  restrict: 'AE',
  scope: {
    task: '=',
    taskOverlayVisibility: '=',
    editFormVisibility: '='
  },
  templateUrl: '../src/view/template/editTasksForm_template.html',
  link: link

}


})

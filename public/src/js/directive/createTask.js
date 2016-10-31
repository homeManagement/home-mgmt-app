angular.module('mgmtApp').directive('createTask', function(){

var controller = function($scope){
  $scope.task = {
    season: 'Monthly'
  }

}



return{
  restrict: 'AE',
  controller: controller,
  templateUrl: '../src/view/template/createTask_template.html'

}


})

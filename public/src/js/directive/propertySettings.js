angular.module('mgmtApp').directive('propertySettings', function(){

var controller = function($scope){
  $scope.propertyCheckBox = {
        value1 : true,
        value2 : true,
        value3 : true
}

}

return{
  restrict: 'AE',
  controller: controller,
  templateUrl: '../src/view/template/propertySettings_template.html'

}


})

angular.module('mgmtApp').directive('propertySettings', function($stateParams){

var controller = function($scope){
  console.log($stateParams);
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

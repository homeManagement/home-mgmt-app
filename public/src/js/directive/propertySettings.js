angular.module('mgmtApp').directive('propertySettings', function($stateParams){

var controller = function($scope, mainService, $window){
  if (!$stateParams.propertyId) {
   $scope.propertyId = $window.localStorage.propertyId
 } else {
   $scope.propertyId = $stateParams.propertyId
 }
mainService.getPropertySettings($scope.propertyId).then(function(res){
  $scope.propertyCheckBox = {
        value1 : res[0]['receive_text'],
        value2 : res[0]['receive_email'],
        value3 : res[0]['receive_weather']
}

})

$scope.update = function(){
  $scope.property_settings = {
    text: $scope.propertyCheckBox.value1,
    email: $scope.propertyCheckBox.value2,
    weather: $scope.propertyCheckBox.value3
  }
  mainService.updatePropertySettings($scope.propertyId, $scope.property_settings).then(function(res){

  })
 }
}



return{
  restrict: 'AE',
  controller: controller,
  templateUrl: '../src/view/template/propertySettings_template.html'

}


})

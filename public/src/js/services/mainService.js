angular.module('mgmtApp')
.service('mainService', function($http){

//////////////////////////
this.getProperties = function(token){
  return $http({
    method: 'GET',
    url: '/properties/' + token
  }).then(function(res){
    console.log("res",res);
    return res.data
  })
}

})

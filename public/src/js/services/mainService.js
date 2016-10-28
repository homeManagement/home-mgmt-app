angular.module('mgmtApp')
.service('mainService', function($http){

//////////////////////////
this.getProperties = function(token){
  return $http({
    method: 'GET',
    url: '/properties/' + token
  }).then(function(res){
    return res.data;
  })
}
this.createProperty = function(property){
  return $http({
    method: 'POST',
    url:'/properties',
    data: property
  }).then(function(res){
    return res.data;
  })
}

this.getDefualtTasks = function(propertyId){
  return $http({
    method: 'GET',
    url: '/defaulttasks/' + propertyId
  }).then(function(res){
    return res.data;
  })
}

this.insertTasks = function(tasks) {
  return $http({
    method: 'POST',
    url: '/maintenancetasks',
    data: tasks
  }).then(function(res){
    return res;
  })
}

})

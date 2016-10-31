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

this.getDefaultTasks = function(propertyId){
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

this.updatePropertySettings = function(propertyId){
  return $http({
    method: 'PUT',
    url: '/propertySettings/' + propertyId
  }).then(function(res){
    return res;
  })
}

this.getPropertyTasks = function(propertyId){
  return $http({
    method: 'GET',
    url: '/maintenancetasks/' + propertyId
  }).then(function(res){
    return res.data;
  })
}

this.createCustomTask = function(task) {
  return $http({
    method: 'POST',
    url: '/createCustomTask',
    data: task
  }).then(function(res){
    return res;
  })
}

})

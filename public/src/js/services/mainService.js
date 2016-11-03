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

  this.updatePropertySettings = function(propertyId, property_settings){
    return $http({
      method: 'PUT',
      url: '/propertySettings/' + propertyId,
      data: property_settings
    }).then(function(res){
      return res;
    })
  }

  this.getPropertySettings = function(propertyId){
    return $http({
      method: 'GET',
      url: '/propertySettings/' + propertyId
    }).then(function(res){
      return res.data;
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
  this.done = function(propertymaintenanceid, alertid){

    return $http({
      method: 'PUT',
      url: '/maintenancetasks/' + propertymaintenanceid,
      data: {alertid: alertid}
    }).then(function(res){
      return res;
    })
  }
  this.snooze = function(alertid) {
    return $http({
      method: 'PUT',
      url: '/alerts/' + alertid
      // data: {alertid: alertid}
    }).then(function(res) {
      return res;
    })

  }
  this.deleteProperty = function(propertyId){
    return $http({
      method: 'DELETE',
      url: '/property/' + propertyId
    }).then(function(res){
      return res
    })
  }
  this.getUserById = function(token){
    return $http({
      method: 'GET',
      url: '/users/' + token
    }).then(function(res){
      return res.data;
    })
  }
  this.updateFirstName = function(id, newFirstName){
    return $http({
      method: 'PUT',
      url: '/users/firstName/'+ id,
      data: {newFirstName: newFirstName}
    }).then(function(res){
      return res;
    })
  }
  this.updateLastName = function(id, newLastName){
    return $http({
      method: 'PUT',
      url: '/users/lastName/'+ id,
      data: {newLastName: newLastName}
    }).then(function(res){
      return res;
    })
  }
  this.updatePhone = function(id, newPhone){
    return $http({
      method: 'PUT',
      url: '/users/phone/'+ id,
      data: {newPhone: newPhone}
    }).then(function(res){
      return res;
    })
  }
  this.updatePassword = function(id, newPassword){
    return $http({
      method: 'PUT',
      url: '/users/password/'+ id,
      data: {newPassword: newPassword}
    }).then(function(res){
      return res;
    })
  }


})

'use strict';

angular.module('mgmtApp', ['ui.router', 'satellizer', 'ngAnimate', 'ngTouch']).config(function ($stateProvider, $urlRouterProvider, $authProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('home', {
    url: "/",
    controller: 'homeCtrl',
    templateUrl: '../src/view/home.html',
    restricted: false
  }).state('properties', {
    url: "/properties",
    controller: 'propertiesCtrl',
    templateUrl: '../src/view/properties.html',
    restricted: true
  }).state('createProperty', {
    url: "/createProperty",
    controller: 'createPropertyCtrl',
    templateUrl: '../src/view/createProperty.html',
    restricted: true
  }).state('mainAlerts', {
    url: "/mainAlerts/",
    controller: 'mainAlertsCtrl',
    templateUrl: '../src/view/mainAlerts.html',
    restricted: true,
    params: { propertyId: null }
  }).state('userSettings', {
    url: "/userSettings",
    controller: 'userSettingsCtrl',
    templateUrl: '../src/view/userSettings.html',
    restricted: true
  }).state('propertySettings', {
    url: "/propertySettings",
    templateUrl: '../src/view/propertySettings.html',
    restricted: true,
    params: { propertyId: null }
  }).state('contact', {
    url: "/about",
    controller: 'contactCtrl',
    templateUrl: '../src/view/about.html',
    restricted: false
  }).state('login', {
    url: "/login",
    templateUrl: '../src/view/login.html',
    restricted: false
  }).state('signup', {
    url: "/signup",
    templateUrl: '../src/view/signup.html',
    restricted: false
  });
  $authProvider.loginUrl = '/auth/login';
  $authProvider.signUpUrl = '/auth/signup';
  $authProvider.facebook({
    clientId: '1730897763901303',
    responseType: 'code',
    name: 'facebook',
    url: '/auth/facebook',
    authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
    redirectUri: window.location.origin + '/properties',
    requiredUrlParams: ['scope'],
    scope: ['email'],
    scopeDelimiter: ',',
    display: 'popup',
    oauthType: '2.0',
    popupOptions: { width: 580, height: 400 }
  });
}).run(function ($rootScope, $state, $window, $auth) {
  $rootScope.$on('$stateChangeStart', function (e, to) {
    //  console.log('$auth.isAuthenticated',$auth.isAuthenticated());
    //  console.log('$window.localStorage',$window.localStorage);
    if (!to.restricted) {
      return;
    }

    if ($auth.isAuthenticated()) {
      return;
    } else {
      e.preventDefault();
      $state.transitionTo('login');
      $state.go('login');
    }
  });
});

angular.module('mgmtApp').controller('contactCtrl', function ($scope, mainService) {});

angular.module('mgmtApp').controller('createPropertyCtrl', function ($scope, mainService, $window, $state) {

  $scope.propertyFromVisibility = true;
  $scope.taskSelectionVisibility = false;
  $scope.customTaskVisibility = false;

  $scope.property = {
    token: $window.localStorage.satellizer_token,
    typeId: 1
  };

  $scope.send = function (property) {
    mainService.createProperty(property).then(function (res) {
      $scope.propertyId = res[0]["id"];
      $scope.propertyFromVisibility = false;
      $scope.taskSelectionVisibility = true;

      mainService.getDefaultTasks($scope.propertyId).then(function (res) {
        $scope.tasks = res;
      });
    });
  };

  $scope.createTasks = function (tasks) {
    var selectedTask = tasks.filter(function (currentValue) {
      currentValue.propertyId = $scope.propertyId;
      return currentValue.selected !== false;
    });
    mainService.insertTasks(selectedTask).then(function (res) {
      if (res.status === 201) {
        console.log($scope.propertyId);
        $state.go('mainAlerts', { propertyId: $scope.propertyId });
      } else {
        alert('server error try resubmit');
      }
    });
  };
});

angular.module('mgmtApp').controller('homeCtrl', function ($scope, mainService) {

  var cnt = 0,
      texts = [];

  // save the texts in an array for re-use
  $(".textContent").each(function () {
    texts[cnt++] = $(this).html();
  });
  function slide() {
    if (cnt >= texts.length) cnt = 0;
    $('#textMessage').html(texts[cnt++]);
    $('#textMessage').fadeIn('slow').animate({ opacity: 1.0 }, 5000).fadeOut('slow', function () {
      return slide();
    });
  }
  slide();
});

angular.module('mgmtApp').controller('mainAlertsCtrl', function ($scope, mainService, $stateParams, $window) {
  if ($stateParams.propertyId) {
    $window.localStorage.propertyId = $stateParams.propertyId;
    $scope.propertyId = $stateParams.propertyId;
  } else if (!$stateParams.propertyId) {
    $scope.propertyId = $window.localStorage.propertyId;
  }

  $scope.getPropertyTasks = function (propertyId) {
    mainService.getPropertyTasks(propertyId).then(function (res) {
      $scope.propertyTasks = res.filter(function (currentValue) {
        return currentValue.inactive === false;
      });
    });
  };

  $scope.getPropertyTasks($scope.propertyId);

  $scope.done = function (propertymaintenanceid, alertid) {
    mainService.done(propertymaintenanceid, alertid).then(function (res) {
      $scope.getPropertyTasks($scope.propertyId);
    });
  };
  $scope.snooze = function (alertid) {
    mainService.snooze(alertid).then(function (res) {
      $scope.getPropertyTasks($scope.propertyId);
    });
  };
});

angular.module('mgmtApp').controller('propertiesCtrl', function ($scope, $window, mainService, $swipe) {

  $scope.propDeleteButtonVisibility = false;
  $scope.propDeleteConfirmVisiblity = false;

  $scope.getProperties = function (token) {
    mainService.getProperties(token).then(function (res) {
      $scope.properties = res;
    });
  };
  $scope.getProperties($window.localStorage.satellizer_token);

  $scope.deleteProperty = function (propertyId) {
    mainService.deleteProperty(propertyId).then(function (res) {
      $scope.properties = $scope.properties.filter(function (currentProp) {
        return currentProp.id !== propertyId;
      });
    });
  };
});

angular.module('mgmtApp').controller('userSettingsCtrl', function ($scope, mainService, $window) {

  $scope.getUserById = function (token) {
    mainService.getUserById(token).then(function (res) {
      $scope.user = res[0];
    });
  };
  $scope.getUserById($window.localStorage.satellizer_token);

  $scope.updateFirstName = function (newFirstName) {
    mainService.updateFirstName($scope.user.id, newFirstName).then(function (res) {
      $scope.user.firstname = newFirstName;
      $scope.firstNameEdit = false;
      $scope.newFirstName = "";
    });
  };
  $scope.updateLastName = function (newLastName) {
    mainService.updateLastName($scope.user.id, newLastName).then(function (res) {
      $scope.user.last_name = newLastName;
      $scope.lastNameEdit = false;
      $scope.newLastName = "";
    });
  };
  /////////////////////edit phone number to (xXx)xXX-XXXX/////////////
  $scope.phoneNumberStyle = function (e) {

    if ($scope.newPhone.length === 1) {
      $scope.newPhone = '(' + $scope.newPhone;
    }
    if (!Number.isInteger(Number(e.key))) {
      $scope.newPhone = $scope.newPhone.split('').splice(0, $scope.newPhone.length - 1).join('');
    }
    if ($scope.newPhone.length === 4) {
      $scope.newPhone = $scope.newPhone + ')';
    }
    if ($scope.newPhone.length === 8) {
      $scope.newPhone = $scope.newPhone + '-';
    }
    if ($scope.newPhone.length === 14) {
      $scope.newPhone = $scope.newPhone.split('').splice(0, $scope.newPhone.length - 1).join('');
    }
  };

  $scope.updatePhone = function (newPhone) {
    newPhone = newPhone.replace(/\D/g, '');
    mainService.updatePhone($scope.user.id, newPhone).then(function (res) {
      $scope.user.phone_number = newPhone;
      $scope.phoneEdit = false;
      $scope.newPhone = "";
    });
  };

  $scope.updatePassword = function (newPassword) {
    mainService.updatePassword($scope.user.id, newPassword).then(function (res) {
      $scope.user.password = newPassword;
      $scope.newPassword = "";
    });
  };
});

angular.module('mgmtApp').directive('createTask', function (mainService, $window) {

  var controller = function controller(scope, element) {
    scope.task = {
      season: 'Monthly'
    };

    scope.createTask = function (propertyId, task) {
      if (!propertyId) {
        task.propertyId = $window.localStorage.propertyId;
      } else {
        task.propertyId = propertyId;
      }

      switch (task.season) {
        case 'Monthly':
          task.dayInterval = 30;
          break;
        case 'Quarterly':
          task.dayInterval = 90;
          break;
        case 'Biannually':
          task.dayInterval = 182;
          break;
        case 'Annually':
          task.dayInterval = 365;
          break;
        default:
          task.dayInterval = task.dayInterval;
      }

      mainService.createCustomTask(task).then(function (res) {

        element.after('<div class="custom-task"><div class="custom-task-title">' + scope.task.name + '</div>');
        //+'</div><span>'+scope.task.lastDate+'</span><span>'+scope.task.season+'</span><span>'+scope.task.dayInterval+'</span><span>'+scope.task.outdoor+'</span><span>'+scope.task.notes+'</span>

        scope.task = {
          name: null,
          season: null,
          lastDate: null,
          dayInterval: null,
          outdoor: false,
          notes: null
        };
      });
    };
  };

  return {
    restrict: 'AE',
    scope: {
      propertyId: '='
    },
    templateUrl: '../src/view/template/createTask_template.html',
    link: controller

  };
});

angular.module('mgmtApp').directive('editTasks', function ($stateParams) {

  var controller = function controller($scope, mainService, $window) {
    if (!$stateParams.propertyId) {
      $scope.propertyId = $window.localStorage.propertyId;
    } else {
      $scope.propertyId = $stateParams.propertyId;
    }

    $scope.editFormVisibility = false;
    $scope.taskOverlayVisibility = false;

    mainService.getPropertyTasks($scope.propertyId).then(function (res) {
      res.map(function (currentValue) {
        currentValue.nextdate = currentValue.nextdate.substr(0, 10);
        currentValue.lastdate = currentValue.lastdate.substr(0, 10);
      });
      $scope.tasks = res;
    });

    $scope.deleteTask = function (propertymaintenanceid) {
      mainService.deleteTask(propertymaintenanceid).then(function (res) {
        $scope.tasks = $scope.tasks.filter(function (currentValue) {
          return currentValue.propertymaintenanceid !== propertymaintenanceid;
        });
      });
    };

    $scope.createTask = function (propertyId, task) {
      if (!propertyId) {
        task.propertyId = $window.localStorage.propertyId;
      } else {
        task.propertyId = propertyId;
      }

      switch (task.season) {
        case 'Monthly':
          task.dayInterval = 30;
          break;
        case 'Quarterly':
          task.dayInterval = 90;
          break;
        case 'Biannually':
          task.dayInterval = 182;
          break;
        case 'Annually':
          task.dayInterval = 365;
          break;
        default:
          task.dayInterval = task.dayInterval;
      }

      mainService.createCustomTask(task).then(function (res) {
        var newTask = res.data[0];
        newTask["dayinterval"] = newTask["day_interval"];
        newTask["nextdate"] = newTask["next_date"].substr(0, 10);
        newTask["lastdate"] = newTask["last_date"].substr(0, 10);
        delete newTask["next_date"];
        delete newTask["last_date"];

        $scope.tasks.push(newTask);

        $scope.newTask = {
          name: null,
          season: null,
          lastDate: null,
          dayInterval: null,
          outdoor: false,
          notes: null
        };
      });
    };
  };

  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/editTasks_template.html'

  };
});

angular.module('mgmtApp').directive('editTasksForm', function (mainService) {

  var link = function link(scope) {
    scope.editTaskObj = {};
    scope.editTaskObj.maintName = scope.task.name;

    scope.editTask = function (task) {
      if (!task) {
        task = {};
      }
      // task["maintName"] = scope.task.name;
      task["inactive"] = scope.task.inactive;
      task["outdoor"] = scope.task.outdoor;
      task["season"] = scope.task.season;
      task["dayInterval"] = scope.task.dayInterval;
      task["notes"] = scope.task.notes;
      mainService.editTask(scope.task.propertymaintenanceid, task).then(function (res) {
        if (res) {
          scope.task.name = res.data[0]["name"];

          scope.task.lastdate = res.data[0]["last_date"].substr(0, 10);

          scope.task.nextdate = res.data[0]["next_date"].substr(0, 10);

          if (!scope.editTaskObj) {
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
      });
    };
  };

  return {
    restrict: 'AE',
    scope: {
      task: '=',
      taskOverlayVisibility: '=',
      editFormVisibility: '='
    },
    templateUrl: '../src/view/template/editTasksForm_template.html',
    link: link

  };
});

angular.module('mgmtApp').directive('headerDirective', function () {
  var controller = function controller($scope, $state, mainService, $rootScope) {

    // menu icon animation

    $(document).ready(function () {
      $('#nav-icon3').click(function () {
        $(this).toggleClass('open');
      });
    });

    // menu dropdown animationm
    $scope.showLogin = function () {
      $scope.modalFunc = !$scope.modalFunc;
      console.log('firing');
    };
    $scope.menuShowing = false;
    $scope.toggleMenu = function () {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      if (!$scope.menuShowing) {
        $('div.menu').addClass('animated slideInDown').one(animationEnd, function () {
          $(this).removeClass('animated slideInDown');
        });
      } else {
        $('div.menu').addClass('animated slideOutUp').one(animationEnd, function () {
          $(this).prev().find('#nav-icon3').removeClass('open');
          $(this).removeClass('animated slideOutUp');
        });
      }
      $scope.menuShowing = !$scope.menuShowing;
      // console.log($scope.menuShowing);
    };
    $scope.closeMenu = function () {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      if ($scope.menuShowing) {
        $('div.menu').addClass('animated slideOutUp').one(animationEnd, function () {
          $(this).prev().find('#nav-icon3').removeClass('open');
          $(this).removeClass('animated slideOutUp');
        });
      }
      $scope.menuShowing = false;
    };

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
      //  console.log($state.current.name);
      switch ($state.current.name) {
        case 'home':
          $scope.viewname = '';
          break;
        case 'properties':
          $scope.viewname = 'Your Properties';
          break;
        case 'createProperty':
          $scope.viewname = 'Property Create';
          break;
        case 'mainAlerts':
          $scope.viewname = 'Upcoming Maintenance';
          break;
        case 'userSettings':
          $scope.viewname = 'User Settings';
          break;
        case 'propertySettings':
          $scope.viewname = 'Property Settings';
          break;
        case 'contact':
          $scope.viewname = 'About';
          break;
        case 'login':
          $scope.viewname = 'Login';
          break;
        case 'signup':
          $scope.viewname = 'Signup';
          break;
        default:
          $scope.viewname = '';
      }
    });
  };

  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/header.html'
  };
});

angular.module('mgmtApp').directive('loginDirective', function () {

  var controller = function controller($scope, $window, $state, $auth) {
    $scope.authenticate = function (provider) {
      // localStorage.clear();
      $auth.authenticate(provider).then(function (response) {
        // console.log(response.data);
        $state.go('properties');
      }).catch(function (response) {
        console.log(response.data);
      });
    };

    $scope.emailLogin = function () {
      $auth.login({ email: $scope.email, password: $scope.password }).then(function (response) {
        $state.go('properties');
      }).catch(function (response) {
        console.log(response);
        $scope.errorMessage = {};
        $scope.loginForm["email"].$setValidity('server', false);
        $scope.errorMessage["email"] = response.data.message;
      });
    };
  };

  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/login_template.html'

  };
});

angular.module('mgmtApp').directive('logoutDirective', function () {

  var controller = function controller($scope, $auth, $window, $state) {
    $scope.logout = function () {
      $auth.logout();
      $state.go('home');
    };
  };

  return {
    restrict: 'AE',
    controller: controller,
    template: '<button class="logout-btn" type="button" ng-click="logout()">logout</button>'

  };
});

angular.module('mgmtApp').directive('propertyForm', function () {

  var controller = function controller($scope) {};

  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/propertyForm_template.html'

  };
});

angular.module('mgmtApp').directive('propertySettings', function ($stateParams) {

  var controller = function controller($scope, mainService, $window) {
    if (!$stateParams.propertyId) {
      $scope.propertyId = $window.localStorage.propertyId;
    } else {
      $scope.propertyId = $stateParams.propertyId;
    }
    mainService.getPropertySettings($scope.propertyId).then(function (res) {
      $scope.propertyCheckBox = {
        value1: res[0]['receive_text'],
        value2: res[0]['receive_email'],
        value3: res[0]['receive_weather']
      };
    });

    $scope.update = function () {
      $scope.property_settings = {
        text: $scope.propertyCheckBox.value1,
        email: $scope.propertyCheckBox.value2,
        weather: $scope.propertyCheckBox.value3
      };
      mainService.updatePropertySettings($scope.propertyId, $scope.property_settings).then(function (res) {});
    };
  };

  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/propertySettings_template.html'

  };
});

angular.module('mgmtApp').directive('serverError', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function link(scope, element, attrs, ctrl) {
      element.on('keydown', function () {
        ctrl.$setValidity('server', true);
      });
    }
  };
});

angular.module('mgmtApp').directive('signupDirective', function () {

  var controller = function controller($scope, $auth, $state) {
    $scope.phoneNumberStyle = function (e) {

      if ($scope.phone.length === 1) {
        $scope.phone = '(' + $scope.phone;
      }
      if (!Number.isInteger(Number(e.key))) {
        $scope.phone = $scope.phone.split('').splice(0, $scope.phone.length - 1).join('');
      }
      if ($scope.phone.length === 4) {
        $scope.phone = $scope.phone + ')';
      }
      if ($scope.phone.length === 8) {
        $scope.phone = $scope.phone + '-';
      }
      if ($scope.phone.length === 14) {
        $scope.phone = $scope.phone.split('').splice(0, $scope.phone.length - 1).join('');
      }
    };

    $scope.signUp = function () {
      var user = {
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        email: $scope.email,
        password: $scope.password,
        phone: $scope.phone
      };

      console.log(user);
      $auth.signup(user).then(function (response) {
        //console.log(response.data);
        $auth.login({ email: $scope.email, password: $scope.password }).then(function (response) {
          $state.go('properties');
        });
      }).catch(function (response) {
        //console.log(response.data);
        $scope.errorMessage = {};
        $scope.loginForm["email"].$setValidity('server', false);
        $scope.errorMessage["email"] = response.data.message;
      });
    };
    $scope.showSignUp = function () {
      $scope.modalSignUpFunc = !$scope.modalSignUpFunc;
      console.log('firing');
    };
  };

  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/signup_template.html'

  };
});

angular.module('mgmtApp').directive('taskSelection', function () {

  var controller = function controller($scope) {};

  return {
    restrict: 'AE',
    controller: controller,
    templateUrl: '../src/view/template/taskSelection_template.html'

  };
});

angular.module('mgmtApp').service('mainService', function ($http) {

  //////////////////////////
  this.getProperties = function (token) {
    return $http({
      method: 'GET',
      url: '/properties/' + token
    }).then(function (res) {
      return res.data;
    });
  };
  this.createProperty = function (property) {
    return $http({
      method: 'POST',
      url: '/properties',
      data: property
    }).then(function (res) {
      return res.data;
    });
  };

  this.getDefaultTasks = function (propertyId) {
    return $http({
      method: 'GET',
      url: '/defaulttasks/' + propertyId
    }).then(function (res) {
      return res.data;
    });
  };

  this.insertTasks = function (tasks) {
    return $http({
      method: 'POST',
      url: '/maintenancetasks',
      data: tasks
    }).then(function (res) {
      return res;
    });
  };

  this.updatePropertySettings = function (propertyId, property_settings) {
    return $http({
      method: 'PUT',
      url: '/propertySettings/' + propertyId,
      data: property_settings
    }).then(function (res) {
      return res;
    });
  };

  this.getPropertySettings = function (propertyId) {
    return $http({
      method: 'GET',
      url: '/propertySettings/' + propertyId
    }).then(function (res) {
      return res.data;
    });
  };

  this.getPropertyTasks = function (propertyId) {
    return $http({
      method: 'GET',
      url: '/maintenancetasks/' + propertyId
    }).then(function (res) {
      return res.data;
    });
  };

  this.createCustomTask = function (task) {
    return $http({
      method: 'POST',
      url: '/createCustomTask',
      data: task
    }).then(function (res) {
      return res;
    });
  };
  this.done = function (propertymaintenanceid, alertid) {
    return $http({
      method: 'PUT',
      url: '/maintenancetasks/' + propertymaintenanceid,
      data: { alertid: alertid }
    }).then(function (res) {
      return res;
    });
  };
  this.snooze = function (alertid) {
    return $http({
      method: 'PUT',
      url: '/alerts/' + alertid
      // data: {alertid: alertid}
    }).then(function (res) {
      return res;
    });
  };
  this.deleteProperty = function (propertyId) {
    return $http({
      method: 'DELETE',
      url: '/property/' + propertyId
    }).then(function (res) {
      return res;
    });
  };
  this.getUserById = function (token) {
    return $http({
      method: 'GET',
      url: '/users/' + token
    }).then(function (res) {
      return res.data;
    });
  };
  this.updateFirstName = function (id, newFirstName) {
    return $http({
      method: 'PUT',
      url: '/users/firstName/' + id,
      data: { newFirstName: newFirstName }
    }).then(function (res) {
      return res;
    });
  };
  this.editTask = function (propertymaintenanceid, task) {
    return $http({
      method: 'PUT',
      url: '/tasksettings/' + propertymaintenanceid,
      data: task
    }).then(function (res) {
      return res;
    });
  };
  this.updateLastName = function (id, newLastName) {
    return $http({
      method: 'PUT',
      url: '/users/lastName/' + id,
      data: { newLastName: newLastName }
    }).then(function (res) {
      return res;
    });
  };
  this.updatePhone = function (id, newPhone) {
    return $http({
      method: 'PUT',
      url: '/users/phone/' + id,
      data: { newPhone: newPhone }
    }).then(function (res) {
      return res;
    });
  };
  this.updatePassword = function (id, newPassword) {
    return $http({
      method: 'PUT',
      url: '/users/password/' + id,
      data: { newPassword: newPassword }
    }).then(function (res) {
      return res;
    });
  };
  this.deleteTask = function (propertymaintenanceid) {
    return $http({
      method: 'DELETE',
      url: '/maintenancetask/' + propertymaintenanceid
    }).then(function (res) {
      return res;
    });
  };
});
//# sourceMappingURL=all.js.map

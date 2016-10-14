// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('ignite2', ['ionic','ignite2.loginController','ignite2.override','ignite2.managerDashboard'])

.run(function($ionicPlatform,$rootScope, $state, $stateParams) {

    $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider

    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

    .state('managerApp', {
    url: '/managerMenu',
    templateUrl: 'templates/Manager/managerMenu.html',
  })

  .state('managerApp.dashboard', {
    url: '/managerDashboard',
     views: {
      'managerMenuContent': {
    templateUrl: 'templates/Manager/dashboard.html',
    controller:'manDashboardCntrl'
          }
       }
  })

  .state('managerApp.dashboard.audit', {
    url: '/auditGraph',
    views: {
      'managerMenuContent@managerApp': {
    parent:'managerApp.dashboard',
    templateUrl: 'templates/Manager/auditGraph.html',
    controller:'manDashboardCntrl'
  }
}
  })


    .state('managerApp.settings', {
    url: '/settings',
         views: {
      'managerMenuContent': {
    templateUrl: 'templates/Manager/settings.html'
     }
   }
  })


    .state('suprvsrApp', {
    url: '/suprvsrMenu',
    templateUrl: 'templates/Supervisor/supervisorMenu.html',
  })

      .state('suprvsrApp.dashboard', {
      url: '/suprvsrDashboard',
           views: {
      'supMenuContent': {
          templateUrl: 'templates/Supervisor/dashboard.html'
        }
      }
     })

    .state('suprvsrApp.overrideApp', {
      url: '/suprvsrOverride',
           views: {
      'supMenuContent': {
          templateUrl: 'templates/Supervisor/override.html',
          controller:'overrideCntrl'
        }
      }
    })

     .state('suprvsrApp.overrideApp.detail', {
      url: '/detail',
         views: {
      'supMenuContent@suprvsrApp': {
          templateUrl: 'templates/Supervisor/overrideDetail.html',
          controller:'overrideCntrl'
       }
     },
           params: {
        detailData: null,
        showpending:false,
        showapproved:false
       }
    })   

    .state('suprvsrApp.settings', {
    url: '/settings',
      views: {
     'supMenuContent': {
    templateUrl: 'templates/Supervisor/settings.html'
     }
   }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

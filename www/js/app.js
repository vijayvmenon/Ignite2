// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('ignite2', ['ionic','ignite2.loginController','ignite2.override','ignite2.managerDashboard','ignite2.notificationController'])

  // allow DI for use in controllers, unit tests
  .constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {

  })

.run(function($ionicPlatform,$rootScope, $state, $stateParams,$window) {

    $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  angular.element($window).bind('resize', function () {
    console.log($window.innerWidth);
});
  
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

    .state('notification', {
    url: '/notification',
    templateUrl: 'templates/notification.html',
    controller: 'notificationCntrl'
  })


    .state('managerApp', {
    url: '/managerMenu',
    templateUrl: 'templates/Manager/managerMenu.html',
  })

  .state('managerApp.dashboard', {
    url: '/managerDashboard',
     views: {
      'managerMenuContent': {
    templateUrl: window.innerWidth > 320 ?'templates/Manager/dashboard.html' :'templates/Manager/dashboardmob.html',
  //  controller:'manDashboardCntrl'
          }
       }
  })

  .state('managerApp.dashboard.slot', {
    url: '/slotGraph',
    views: {
      'managerMenuContent@managerApp': {
   parent:'managerApp.dashboard',
   // templateUrl: 'templates/Manager/slotGraph.html',
    controller:'manSlotCntrl'
  }
}
  })

  .state('managerApp.dashboard.productivity', {
    url: '/productivityGraph',
    views: {
      'managerMenuContent@managerApp': {
    parent:'managerApp.dashboard',
  //  templateUrl: 'templates/Manager/productivityGraph.html',
    controller:'manProductivityCntrl'
  }
}
  })

  .state('managerApp.dashboard.remedycrq', {
    url: '/remedycrq',
    views: {
      'managerMenuContent@managerApp': {
    parent:'managerApp.dashboard',
//    templateUrl: 'templates/Manager/productivityGraph.html',
    controller:'manRemedyCrqCntrl'
  }
}
  })

    .state('managerApp.dashboard.palletmvmt', {
    url: '/palletMvmt',
    views: {
      'managerMenuContent@managerApp': {
    parent:'managerApp.dashboard',
 //   templateUrl: 'templates/Manager/palletmvmt.html',
    controller:'manPalletMvmtCntrl'
  }
}
  })

        .state('managerApp.dashboard.itemmvmt', {
    url: '/itemMvmt',
    views: {
      'managerMenuContent@managerApp': {
    parent:'managerApp.dashboard',
 //   templateUrl: 'templates/Manager/itemmvmt.html',
    controller:'manItemMvmtCntrl'
  }
}
  })

        .state('managerApp.dashboard.calender', {
    url: '/calender',
    views: {
      'managerMenuContent@managerApp': {
    parent:'managerApp.dashboard',
 //   templateUrl: 'templates/Manager/itemmvmt.html',
    controller:'manCalenderCntrl'
  }
}
  })

    .state('managerApp.settings', {
    url: '/settings',
         views: {
      'managerMenuSettings': {
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
      'supOverrideView': {
          templateUrl: 'templates/Supervisor/override.html',
          controller:'overrideCntrl'
        }
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






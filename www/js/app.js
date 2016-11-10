// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('ignite2', ['ionic','ignite2.loginController','ignite2.override','ignite2.managerDashboard','ignite2.notificationController','ignite2.supervisorSearch'])

  // allow DI for use in controllers, unit tests
  .constant('_', window._)

//This is a constant defined as an Immediately invoked function execution where "platform" variable is set to the platform returned by 
//ionic.platform function . This variable is used in the config for states to set templateurl based on routes.

  .constant('platform', (function($ionicPlatform) {
    var platfrm = ionic.Platform.platform();

  if (platfrm == "android") {
    platform = "android"
  }
    else if (platfrm == "ios") {
    platform = "ios"
  }
   else {
    platform = "windows"
   }
   return platform;
  })())

  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {

  })

.run(function($ionicPlatform,$rootScope, $state, $stateParams,$window) {

    $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
   $rootScope._ = window._;

     console.log(platform);

  angular.element($window).bind('resize', function () {
  //  console.log($window.innerWidth);
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


.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  
  //Below line is to show the Tabs on bottom in Mobile
  $ionicConfigProvider.tabs.position('bottom'); 

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
     //The templateurl is set based on the constant "platform" defined in the constant function for module. go to windows template for windows 
    //else go to mobile template :-)
    templateUrl: ( platform == 'windows' )? 'templates/Manager/dashboard.html' : 'templates/Manager/dashboardmob.html'
  //  controller:'manDashboardCntrl'
          }
       }
  })

  .state('managerApp.dashboard.productivity', {
    url: '/productivityGraph',
    views: {
      'managerMenuContent@managerApp': {
    parent:'managerApp.dashboard',
  templateUrl: 'templates/Manager/productivityGraph.html',
    controller:'manProductivityCntrl'
  }
}
  })

    .state('managerApp.dashboard.remedycrq', {
    url: '/remedyCrqStats',
    views: {
      'managerMenuContent@managerApp': {
    parent:'managerApp.dashboard',
  templateUrl: 'templates/Manager/remedyCrq.html',
    controller:'manRemedyCrqCntrl'
  }
}
  })

  .state('managerApp.dashboard.slot', {
    url: '/slotGraph',
    views: {
      'managerMenuContent@managerApp': {
   parent:'managerApp.dashboard',
   templateUrl: 'templates/Manager/slotGraph.html',
    controller:'manSlotCntrl'
  }
}
  })



    .state('managerApp.dashboard.palletmvmt', {
    url: '/palletMvmt',
    views: {
      'managerMenuContent@managerApp': {
    parent:'managerApp.dashboard',
    templateUrl: 'templates/Manager/palletMvmt.html',
    controller:'manPalletMvmtCntrl'
  }
}
  })

        .state('managerApp.dashboard.itemmvmt', {
    url: '/itemMvmt',
    views: {
      'managerMenuContent@managerApp': {
    parent:'managerApp.dashboard',
     templateUrl: 'templates/Manager/itemMvmt.html',
    controller:'manItemMvmtCntrl'
  }
}
  })

        .state('managerApp.dashboard.trip', {
    url: '/trip',
    views: {
      'managerMenuContent@managerApp': {
    parent:'managerApp.dashboard',
    templateUrl: 'templates/Manager/tripStats.html',
    controller:'manTripCntrl'
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

      .state('suprvsrApp.search', {
      url: '/suprvsrSearch',
           views: {
      'supSearchContent': {
          templateUrl: 'templates/Supervisor/supervisorWiki/supervisorSearch.html',
          controller:'TypeAheadController',
        }
      }

     })

            .state('suprvsrApp.search.item', {
      url: '/itemDetails',
           views: {
      'supSearchContent@suprvsrApp': {
          templateUrl: 'templates/Supervisor/supervisorWiki/itemDetails.html',
          controller:'itemDetailsController',
        }
      },
      params: {
        itemnbr:null
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







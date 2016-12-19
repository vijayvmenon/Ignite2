// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('ignite2', ['ionic','ionic.cloud','ngCordova','ignite2.loginController','ignite2.override','ignite2.managerDashboard','ignite2.notificationController','ignite2.supervisorSearch'])

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
//Below is for hiding splashscreen
navigator.splashscreen.hide()
//Below is for local notifications
           window.plugin.notification.local.onadd = function (id, state, json) {
            var notification = {
                id: id,
                state: state,
                json: json
            };
            $timeout(function() {
                $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
            });
        };
  });
})


.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$ionicCloudProvider) {
  
//This is for ionic cloud 
    $ionicCloudProvider.init({
    "core": {
      "app_id": "e85b76a6"
    },
    "push": {
      "sender_id": "125343275449",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
  //Below line is to show the Tabs on bottom in Mobile
  $ionicConfigProvider.tabs.position('bottom'); 

  $stateProvider

    .state('login', {
    url: '/login',
    templateUrl: ( platform == 'windows' ) ? 'templates/login.html' : 'templates/loginmob.html',
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



    .state('managerApp.dashboard.sunburst', {
    url: '/financial',
    views: {
      'managerMenuContent@managerApp': {
    parent:'managerApp.dashboard',
    templateUrl: 'templates/Manager/financials.html',
    controller:'sunburstCntrl'
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
            templateUrl: ( platform == 'windows' )? 'templates/Supervisor/supervisorWiki/supervisorSearch.html' : 'templates/Supervisor/supervisorWiki/supervisorSearchmob.html',
          controller:'TypeAheadController',
        }
      }

     })

   /**
            .state('suprvsrApp.search.item', {
      url: '/itemDetails',
           views: {
      'supSearchContent@suprvsrApp': {
          templateUrl: ( platform == 'windows' ) ? 'templates/Supervisor/supervisorWiki/itemDetails.html' : 'templates/Supervisor/supervisorWiki/itemDetailsmob.html',
          controller:'itemDetailsController',
        }
      },
      params: {
        itemnbr:null
      }
     })

            .state('suprvsrApp.search.user', {
      url: '/userDetails',
           views: {
      'supSearchContent@suprvsrApp': {
          templateUrl: ( platform == 'windows' ) ? 'templates/Supervisor/supervisorWiki/userDetails.html' : 'templates/Supervisor/supervisorWiki/userDetailsmob.html',
          controller:'userDetailsController',
        }
      },
     })

**/
    .state('suprvsrApp.overrideApp', {
      url: '/suprvsrOverride',
           views: {
      'supOverrideView': {
          templateUrl: ( platform == 'windows' ) ? 'templates/Supervisor/override.html' : 'templates/Supervisor/overridemob.html',
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
})

.controller("ExampleController", function($scope, $rootScope,$cordovaLocalNotification) {

    $scope.add = function() {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);
        $cordovaLocalNotification.add({
            id: "1234",
            date: alarmTime,
            message: "This is a message",
            title: "This is a title",
            autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });
    };
 
    $scope.isScheduled = function() {
        $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    }
 
});



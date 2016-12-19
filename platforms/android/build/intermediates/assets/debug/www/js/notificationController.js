angular.module('ignite2.notificationController', [])

.controller('manNotificationCntrl',function ($scope,$ionicPopover,notificationService) {
   $scope.manNotif=notificationService.manNotifications;
   $scope.manNotifCount=$scope.manNotif.length;
  $ionicPopover.fromTemplateUrl('templates/Manager/notification.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });    
})

.controller('manEmailCntrl',function ($scope,$ionicPopover,notificationService) {
    $scope.manEmail=notificationService.manEmails;
   $scope.manEmailCount=$scope.manEmail.length;
  $ionicPopover.fromTemplateUrl('templates/Manager/email.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });    
})


.controller('supNotificationCntrl',function ($scope,$ionicPopover,notificationService) {
  // console.log('reached notif controller');
   $scope.supNotif=notificationService.supNotifications;
   $scope.supNotifCount=$scope.supNotif.length;
  $ionicPopover.fromTemplateUrl('templates/Supervisor/notification.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });    
})

.controller('supEmailCntrl',function ($scope,$ionicPopover,notificationService) {
    $scope.supEmail=notificationService.supEmails;
   $scope.supEmailCount=$scope.supEmail.length;
  $ionicPopover.fromTemplateUrl('templates/Supervisor/email.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });   
})

.factory('notificationService', function(){

    return {

     manNotifications:[{"id":1,"text":"Dry Area 45% Slots Empty"},
     {"id":2,"text":"120 Unassigned Chase trips"},
     {"id":3,"text":"Receiving Rate lower"},
     {"id":4,"text":"Shipping Rate higher"}],

     manEmails:[{id:1,from:"DSSM",subject:"DC's with high receiving",time:"10/28/2016 9:10:00 AM"},
     {id:2,from:"Walmart-HR",subject:"DC Supervisor Appraisal",time:"10/28/2016 9:30:00 AM"},
     {id:3,from:"Walmart-Finance",subject:"Invoices for Oct 2016",time:"10/28/2016 10:20:00 AM"}],

          supNotifications:[{"id":1,"text":"User jdoe performance lower"},
          {"id":2,"text":"Inbound PO 1234 Late"},
          {"id":3,"text":"Item 12345 Exceeds Cube Limit"},
          {"id":4,"text":"40 PO's Received today"},
          {"id":5,"text":"Item 87654 - No Valid Slot"}],

     supEmails:[{id:1,from:"DC1234-Automated Reports",subject:"Performace Report",time:"10/27/2016 8:10:00 AM"}]

    };
})

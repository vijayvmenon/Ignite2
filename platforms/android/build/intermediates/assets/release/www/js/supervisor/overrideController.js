angular.module('ignite2.override', ['LocalStorageModule'])

.controller('overrideCntrl', ['$scope','$http','$rootScope','$interval','$ionicPlatform','$cordovaLocalNotification','overrideService','$ionicPopup', '$stateParams', '$state', function($scope,$http,$rootScope,$interval,$ionicPlatform,$cordovaLocalNotification,overrideService,$ionicPopup,$stateParams,$state){

$scope.podata=[];  
$scope.suprvsrArr=[];
$scope.apprvData=[];
$scope.getbadge=0;
//This function is called in supervisorMenu.html for the tab for override, where badge count is binded to this function

$scope.getdata = function() {
  $scope.suprvsrArr=[];
$scope.apprvData=[];
  overrideService.getDet()
.success(function(response) {
  console.log(response);
 $scope.podata=response; 
  var count=0; 
 for (var i=0;i<$scope.podata.length;i++) {
  if($scope.podata[i].poStatus == "Waiting for Override") {
    console.log('reached here');
    $scope.suprvsrArr.push($scope.podata[i]);
    count++;
  }
  if($scope.podata[i].overrideStatus == "Y") {
    $scope.apprvData.push($scope.podata[i]);
  }  
 } 
})
.error(function() {
  console.log("error!!");
});
};

//This function is to monitor th override count evry x seconds and is called by interva function below
$scope.getintervaldata = function() {
  overrideService.getDet()
.success(function(response) {
 $scope.podata=response; 
 console.log('interval running');
  var count=0; 
  var tempArr=[];
 for (var i=0;i<$scope.podata.length;i++) {
  if($scope.podata[i].poStatus == "Waiting for Override") {
    count++;
    tempArr=$scope.podata[i];
  }
 } 
 console.log(count);
if(typeof tempcount == 'undefined') {
  tempcount = count;
 }
 else {
  if ( count > tempcount ) {
    //This is the code to send a Local Notification on Mobile webview
    $ionicPlatform.ready(function () {
          if (ionic.Platform.isWebView()) {
            var random_id=Math.floor(Math.random() * 100);
      $cordovaLocalNotification.schedule({
      id: random_id,
      text: '1 New Override Request',
      title: 'Manager Override'
     // icon:null,
     // sound:null
    }).then(function () {
      console.log("Instant Notification set");
    });
         cordova.plugins.notification.local.on("click", function (notification, state) {
          $state.go('suprvsrApp.overrideApp');
      }, this)
  }
  });
    console.log('new notification created');
       $scope.getbadge=count;
     $state.reload('suprvsrApp.overrideApp');
    console.log($scope.suprvsrArr);
    tempcount = count;
  }
  if(count < tempcount) {
      $scope.getbadge=count;
      console.log('reached count less than temp countxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
     $state.reload('suprvsrApp.overrideApp');
    console.log($scope.suprvsrArr);
    tempcount = count;
  }
  if( count == tempcount ) {
    tempcount = count;
  }
 }
})
.error(function() {
  console.log("error!!");
});
};



//Run the getforBadge() in Service. Then when the broadcast is sent, capture it using $scope.on and then assign scope variable for the badge count
//Thus approach is used because since its an AJAX call and returns a promise, we need to make sure that Data is returned before doing anything.
//To ensure this, a Broadcast is sent and then used in controller using $scope.$on
overrideService.getforBadge();
$scope.$on('overrideService:getDataSuccess',function() {
  console.log('reached broadcast'); 
  $scope.getbadge=overrideService.badgecount();
});


$scope.getdata();

$rootScope.supOverrideInterval=$interval(function() {
  $scope.getintervaldata();
},400000)


//$scope.$on('$destroy',function(){
//$interval.cancel($rootScope.supOverrideInterval);
//console.log('interval cancelled');
//});




var temppodata=[];
$scope.approve=function(item) {
for (var i=0;i<$scope.podata.length;i++) { 
  //Looping through podata array to find the record matching the one that is approved
  if ($scope.podata[i].poNbr == item.poNbr && $scope.podata[i].itemNbr == item.itemNbr && $scope.podata[i].deliveryNbr == item.deliveryNbr) {
       $scope.podata[i].poStatus="Approved by Manager";
       $scope.podata[i].isLocked=false;
       $scope.podata[i].overrideStatus="Y";

//removing the approved record from supervisor array
       for (var j=0;j<$scope.suprvsrArr.length;j++) {
        if ($scope.suprvsrArr[j].poNbr == $scope.podata[i].poNbr && $scope.suprvsrArr[j].itemNbr == $scope.podata[i].itemNbr && $scope.suprvsrArr[j].deliveryNbr == $scope.podata[i].deliveryNbr) {
       $scope.suprvsrArr.splice(j,1);
         }
       }
      //pushing the approved recrod to approved array
      $scope.apprvData.push($scope.podata[i]);

      //assigning the current for loop record to temporary array and breaking out of loop
       temppodata=$scope.podata[i];
       console.log(temppodata);

       break;
      }
    }
    
      overrideService.updDet(temppodata)
         .success(function(data, status, headers, config) {
          console.log('success!!' + '\n\n' + data+'\n'+status+'\n'+headers+'\n'+config);         
       //Assigning badge count
          overrideService.getforBadge();
          })
        .error(function(data, status, headers, config) {
          console.log('error!!' + '\n\n' + data+'\n'+status+'\n'+headers+'\n'+config);
         });
}
}])


//Below service is to get the badge count to show in the Tab for Override
.factory('overrideService',function($http,$rootScope){

  //OK, so the logic here is a bit complex. Had to search a lot on how to do it for AJAX calls. Basically, what we are doing is that we are using
  //Broadcast to send the string "overrideService:getDataSuccess" in rootscope so that badge count runs only after the data is returned by the
  //AJAX call. In the controller above, I have put comments on the part where the broadcast is used.
   var pendingArr=[];
   var servpodata=[];
  return {
    getforBadge:function(){
   var pendingArr=[];
   $http.get('https://receiving.cfapps.io/getallpoinfo')
   .success(function(response) {
  servpodata=response; 
  console.log(servpodata);
 $rootScope.$broadcast('overrideService:getDataSuccess');
 })
 .error(function() {
  console.log("error!!");
});
},

//The badgecount function is used to get the badgecount through the pendingArr[]
badgecount:function() {
  pendingArr=[];
 for (var i=0;i<servpodata.length;i++) {
  if(servpodata[i].poStatus == "Waiting for Override") {
    pendingArr.push(servpodata[i]);
  }
 } 
 console.log(pendingArr.length);
     return pendingArr.length;
},

        getDet:function() {
      return $http.get('https://receiving.cfapps.io/getallpoinfo');
    },

    updDet:function(data) {
      return $http.put('https://receiving.cfapps.io/updatepoinfo',data,{})
    }

  }    
});
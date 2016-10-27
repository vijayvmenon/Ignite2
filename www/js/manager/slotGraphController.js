angular.module('ignite2.managerDashboard')



.controller('manSlotCntrl', ['$scope','$http','$ionicPopup','manSlotSvc','localStorageService', '$stateParams', '$state', function($scope,$http,$ionicPopup,manSlotSvc,localStorageService,$stateParams,$state){
	

  $scope.manSlotSvc=manSlotSvc;

$scope.showSSTKfn=function() {
$scope.manSlotSvc.showsstk=true;
$scope.manSlotSvc.showpbyl=false;
$scope.manSlotSvc.active="SSTK"
};

$scope.showPBYLfn=function() {
$scope.manSlotSvc.showsstk=false;
$scope.manSlotSvc.showpbyl=true;
$scope.manSlotSvc.active="PBYL";
};


/**below logic is to get the Slot details from the cfapps website. The http.get returns a promise and $scope.sstkslotdet and pbylslotdet are 
assigned the result of the promise in the success function **/


//Below Function is to sort an array based on key value
var keysrt =function (key) {
  return function(a,b){
   if (a[key] > b[key]) return 1;
   if (a[key] < b[key]) return -1;
   return 0;
  }
}


$scope.sstkslotdet=[];
$scope.pbylslotdet=[];

manSlotSvc.sstk_data().success(function(data) {
  //Sorting the array when http returns it
  $scope.sstktotal=data.totalSlots;
  console.log($scope.sstktotal);
$scope.sstkslotdet = data.slotMetrics.sort(keysrt("slotStatus"));
console.log($scope.sstkslotdet);
 $scope.sstkempty_data=$scope.sstkslotdet[1];
 console.log($scope.sstkempty_data);
 $scope.sstkempty_per=Math.round($scope.sstkempty_data.count*100/$scope.sstktotal);
 console.log($scope.sstkempty_per);
  $scope.sstkfull_data = $scope.sstkslotdet[2];
$scope.sstkfull_per=Math.round($scope.sstkfull_data.count*100/$scope.sstktotal);
 $scope.sstkaudit_data = $scope.sstkslotdet[0];
$scope.sstkaudit_per=Math.round($scope.sstkaudit_data.count*100/$scope.sstktotal);
 $scope.sstkrotate_data = $scope.sstkslotdet[4];
$scope.sstkrotate_per=Math.round($scope.sstkrotate_data.count*100/$scope.sstktotal);
})
.error(function(data) {
  console.log('error');
});

manSlotSvc.pbyl_data().success(function(data) {
  $scope.pbyltotal=data.totalSlots;
$scope.pbylslotdet = data.slotMetrics.sort(keysrt("slotStatus"));
 $scope.pbylempty_data=$scope.pbylslotdet[1];
 $scope.pbylempty_per=Math.round($scope.pbylempty_data.count*100/$scope.pbyltotal);
  $scope.pbylfull_data = $scope.pbylslotdet[2];
$scope.pbylfull_per=Math.round($scope.pbylfull_data.count*100/$scope.pbyltotal);
 $scope.pbylaudit_data = $scope.pbylslotdet[0];
$scope.pbylaudit_per=Math.round($scope.pbylaudit_data.count*100/$scope.pbyltotal);
 $scope.pbylrotate_data = $scope.pbylslotdet[4];
$scope.pbylrotate_per=Math.round($scope.pbylrotate_data.count*100/$scope.pbyltotal);
})
.error(function(data) {
  console.log('error');
});



 //console.log(window.innerWidth); 

}])


.factory('manSlotSvc', function($http) {

  return {
  showsstk:true,
  showpbyl:false,
    active:"SSTK",
      sstk_data: function(){
        return $http.get('http://igniteservices.cfapps.io/slotstatus/SSTK');
      },
      pbyl_data: function(){
        return $http.get('http://igniteservices.cfapps.io/slotstatus/PBYL');
      }
}
});
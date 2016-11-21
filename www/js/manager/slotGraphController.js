angular.module('ignite2.managerDashboard')



.controller('manSlotCntrl', ['$scope','$http','$ionicPopup','manSlotSvc','localStorageService', '$stateParams', '$state', function($scope,$http,$ionicPopup,manSlotSvc,localStorageService,$stateParams,$state){
	

  $scope.manSlotSvc=manSlotSvc;

$scope.showSSTKfn=function() {
$scope.manSlotSvc.showsstk=true;
$scope.manSlotSvc.showpbyl=false;
$scope.manSlotSvc.active="SSTK";
};

$scope.showPBYLfn=function() {
$scope.manSlotSvc.showsstk=false;
$scope.manSlotSvc.showpbyl=true;
$scope.manSlotSvc.active="PBYL";
};

var getRandomInt=function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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


/**var getSum=function(arr) {
  var sum=0;
  for (var i = 0;i< arr.length;i++)
  {
     sum+=arr[i].count
  }
  return sum;
}

**/

$scope.sstkslotdet=[];
$scope.pbylslotdet=[];

var sstk_temp_arr=[];
var sstk_full=getRandomInt(500,1000);
var sstk_partial=getRandomInt(200,500);

var tempsstkvar=sstk_full+sstk_partial;

while(true) 
{ 
sstk_aud=getRandomInt(0,1000);
sstk_lock=getRandomInt(0,1000);
sstk_nr=getRandomInt(0,1000);
if( (sstk_aud+sstk_lock+sstk_nr) == tempsstkvar ) 
{ 
 break;
}
}

var sstkslotmetrics=[{"slotStatus":"Full","count":sstk_full},{"slotStatus":"Empty","count":getRandomInt(100,300)},
{"slotStatus":"Audited","count":sstk_aud},{"slotStatus":"Locked","count":sstk_lock},
{"slotStatus":"Not Rotated","count":sstk_nr},{"slotStatus":"Partial","count":sstk_partial}];

var sstk_sorted=sstkslotmetrics.sort(keysrt("slotStatus"));
var sstktotalslt=sstk_sorted[1].count+sstk_sorted[2].count+sstk_sorted[5].count;

$scope.sstkSlotArray={"slotMetrics":sstk_sorted,"totalSlots":sstktotalslt};


//manSlotSvc.sstk_data().success(function(data) {
  //Sorting the array when http returns it
  $scope.sstktotal=$scope.sstkSlotArray.totalSlots;
 // console.log($scope.sstktotal);
$scope.sstkslotdet = $scope.sstkSlotArray.slotMetrics;
//console.log($scope.sstkslotdet);
 $scope.sstkempty_data=$scope.sstkslotdet[1];
// console.log($scope.sstkempty_data);
 $scope.sstkempty_per=Math.round($scope.sstkempty_data.count*100/$scope.sstktotal);
// console.log($scope.sstkempty_per);
  $scope.sstkfull_data = $scope.sstkslotdet[2];
$scope.sstkfull_per=Math.round($scope.sstkfull_data.count*100/$scope.sstktotal);
 $scope.sstkaudit_data = $scope.sstkslotdet[0];
$scope.sstkaudit_per=Math.round($scope.sstkaudit_data.count*100/$scope.sstktotal);
 $scope.sstkrotate_data = $scope.sstkslotdet[4];
$scope.sstkrotate_per=Math.round($scope.sstkrotate_data.count*100/$scope.sstktotal);
 $scope.sstkpartial_data = $scope.sstkslotdet[5];
$scope.sstkpartial_per=Math.round($scope.sstkpartial_data.count*100/$scope.sstktotal);
 $scope.sstklock_data = $scope.sstkslotdet[3];
$scope.sstklock_per=Math.round($scope.sstklock_data.count*100/$scope.sstktotal);
//})
//.error(function(data) {
  //console.log('error');
//});



var pbyl_temp_arr=[];
var pbyl_full=getRandomInt(100,400);
var pbyl_partial=getRandomInt(100,200);

var temppbylvar=pbyl_full+pbyl_partial;

while(true) 
{ 
pbyl_aud=getRandomInt(0,600);
pbyl_lock=getRandomInt(0,600);
pbyl_nr=getRandomInt(0,600);
if( (pbyl_aud+pbyl_lock+pbyl_nr) == temppbylvar ) 
{ 
 break;
}
}

var pbylslotmetrics=[{"slotStatus":"Full","count":pbyl_full},{"slotStatus":"Empty","count":getRandomInt(50,200)},
{"slotStatus":"Audited","count":pbyl_aud},{"slotStatus":"Locked","count":pbyl_lock},
{"slotStatus":"Not Rotated","count":pbyl_nr},{"slotStatus":"Partial","count":pbyl_partial}];

var pbyl_sorted=pbylslotmetrics.sort(keysrt("slotStatus"));
var pbyltotalslt=pbyl_sorted[1].count+pbyl_sorted[2].count+pbyl_sorted[5].count;

$scope.pbylSlotArray={"slotMetrics":pbyl_sorted,"totalSlots":pbyltotalslt};


//manSlotSvc.pbyl_data().success(function(data) {
  $scope.pbyltotal=$scope.pbylSlotArray.totalSlots;
$scope.pbylslotdet = $scope.pbylSlotArray.slotMetrics;
//console.log($scope.pbylslotdet);
 $scope.pbylempty_data=$scope.pbylslotdet[1];
 $scope.pbylempty_per=Math.round($scope.pbylempty_data.count*100/$scope.pbyltotal);
  $scope.pbylfull_data = $scope.pbylslotdet[2];
$scope.pbylfull_per=Math.round($scope.pbylfull_data.count*100/$scope.pbyltotal);
 $scope.pbylaudit_data = $scope.pbylslotdet[0];
$scope.pbylaudit_per=Math.round($scope.pbylaudit_data.count*100/$scope.pbyltotal);
 $scope.pbylrotate_data = $scope.pbylslotdet[4];
$scope.pbylrotate_per=Math.round($scope.pbylrotate_data.count*100/$scope.pbyltotal);
 $scope.pbylpartial_data = $scope.pbylslotdet[5];
$scope.pbylpartial_per=Math.round($scope.pbylpartial_data.count*100/$scope.pbyltotal);
 $scope.pbyllock_data = $scope.pbylslotdet[3];
$scope.pbyllock_per=Math.round($scope.pbyllock_data.count*100/$scope.pbyltotal);
//})
//.error(function(data) {
 // console.log('error');
//});

//Below logic is to get the total empty and full slots percentage in the DC for Mobile snapshot
var tot_empty_slots=$scope.sstkslotdet[1].count + $scope.pbylslotdet[1].count ;
var tot_full_slots=$scope.sstkslotdet[2].count + $scope.pbylslotdet[2].count;
var tot_partial_slots=$scope.sstkslotdet[5].count + $scope.pbylslotdet[5].count;
var tot_dc_slots=tot_empty_slots + tot_full_slots + tot_partial_slots;


var round = function (value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
$scope.tot_empty_per=round(((tot_empty_slots*100)/tot_dc_slots),0);
$scope.tot_full_per=round(((tot_full_slots*100)/tot_dc_slots),0);
$scope.tot_partial_per=round(((tot_partial_slots*100)/tot_dc_slots),0);

//console.log(tot_empty_slots)
//console.log(tot_full_slots);
//console.log(tot_dc_slots);
//console.log(tot_partial_slots);
//console.log($scope.tot_empty_per);
//console.log($scope.tot_full_per);
//console.log($scope.tot_partial_per);

$scope.emptyStyle={ 
    backgroundColor: "#4ce600"
};


$scope.fullStyle= {
    backgroundColor:"#d9b38c"
};


}])


.factory('manSlotSvc', function($http) {

  return {
  showsstk:true,
  showpbyl:false,
    active:"SSTK",
      sstk_data: function(){
        return $http.get('https://igniteservices.cfapps.io/slotstatus/SSTK');
      },
      pbyl_data: function(){
        return $http.get('https://igniteservices.cfapps.io/slotstatus/PBYL');
      }
}
});
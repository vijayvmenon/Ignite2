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



$scope.sstktotal=350;

 $scope.sstkempty_data = {label: "EMPTY", value: 210};

$scope.sstkempty_per=Math.round($scope.sstkempty_data.value*100/$scope.sstktotal);

 $scope.sstkheld_data = {label: "HELD", value: 64};

$scope.sstkheld_per=Math.round($scope.sstkheld_data.value*100/$scope.sstktotal);

 $scope.sstkaudit_data = {label: "AUDITED", value: 34};

$scope.sstkaudit_per=Math.round($scope.sstkaudit_data.value*100/$scope.sstktotal);

 $scope.sstkrotate_data = {label: "NOT ROTATED", value: 78 };

$scope.sstkrotate_per=Math.round($scope.sstkrotate_data.value*100/$scope.sstktotal);
//$scope.sstkgauge_options = {thickness: 15, mode: "gauge", total: 100};


$scope.pbyltotal=250;

 $scope.pbylempty_data = {label: "EMPTY", value: 135};

$scope.pbylempty_per=$scope.pbylempty_data.value*100/$scope.pbyltotal;

 $scope.pbylheld_data = {label: "HELD", value: 47};

$scope.pbylheld_per=$scope.pbylheld_data.value*100/$scope.pbyltotal;

 $scope.pbylaudit_data ={label: "AUDITED", value: 98};

$scope.pbylaudit_per=$scope.pbylaudit_data.value*100/$scope.pbyltotal;

 $scope.pbylrotate_data = {label: "NOT ROTATED", value: 78};

$scope.pbylrotate_per=$scope.pbylrotate_data.value*100/$scope.pbyltotal;


/**
            $http.get('http://igniteservices.cfapps.io/slot/EASYPICK').
        then(function(response) {
            $scope.greeting = response.data;
            console.log($scope.greeting);
        },
        function (error) {
          console.log("not working");
        });
**/

// manSlotSvc.getslot();
 //$scope.slotdet=manSlotSvc.greeting;
  //$scope.slotdet = manSlotSvc.showpbyl;
 //console.log($scope.slotdet);
 //console.log(window.innerWidth); 

}])


.factory('manSlotSvc', function($http){
  return {
  showsstk:true,
    showpbyl:false,
    active:"SSTK"
   // getslot: function () {
     // $http.get('http://igniteservices.cfapps.io/slot/EASYPICK').
       // then(function(response) {
         //   greeting = response.data;
        //},
        //function (error) {
         // return "not working";
        //});
 // }
}
});
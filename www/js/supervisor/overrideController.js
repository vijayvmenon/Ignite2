angular.module('ignite2.override', ['LocalStorageModule'])

.controller('overrideCntrl', ['$scope','$http','badgeCountService','$ionicPopup','localStorageService', '$stateParams', '$state', function($scope,$http,badgeCountService,$ionicPopup,localStorageService,$stateParams,$state){
	

$scope.apprvData=[];
badgeCountService.getBadgeCount();

//This function is called in supervisorMenu.html for the tab for override, where badge count is binded to this function

$scope.getbadge = function() {
  return badgeCountService.getBadgeCount();
}

$scope.generatePendingArray = function() {
  $scope.suprvsrArr=[];
  if(localStorage.getItem('gridData') !== null) {
  $scope.mainData=JSON.parse(localStorage.getItem("gridData"));
  for (var i =0;i<$scope.mainData.length;i++) {
    if ($scope.mainData[i].Status == "Waiting for Override") {
          $scope.suprvsrArr.push($scope.mainData[i]);
    }
  }
}
badgeCountService.getBadgeCount();
$scope.apprvData=JSON.parse(localStorage.getItem("apprData"));
}

$scope.apprvData=JSON.parse(localStorage.getItem("apprData"));
$scope.generatePendingArray();


$scope.approve=function(item) {

for (var i=0;i<$scope.mainData.length;i++) { 
  if ($scope.mainData[i].PoNbr == item.PoNbr && $scope.mainData[i].ItemNbr == item.ItemNbr && $scope.mainData[i].DeliveryNo == item.DeliveryNo) {
$scope.mainData[i].Status="Approved by Manager";
$scope.mainData[i].isLocked=false;
localStorage.setItem("gridData",JSON.stringify($scope.mainData))

 //Below logic is to push the Approve by Manager data to a new Array and store it 
if(localStorage.getItem('apprData') === null) {
var a = [];
a.push($scope.mainData[i]);
localStorage.setItem('apprData', JSON.stringify(a));
}
else {
    var a = [];
    a = JSON.parse(localStorage.getItem('apprData'));
    a.push($scope.mainData[i]);
    localStorage.setItem('apprData', JSON.stringify(a));
   }
  }
 }
$scope.generatePendingArray();
}

}])


//Below service is to get the badge count to show in the Tab for Override
.factory('badgeCountService', ['localStorageService', function(localStorageService){
   var getBadgeCount = function(){
   pendingArr=[];
    if(localStorage.getItem('gridData') !== null) {
  mainGrid=JSON.parse(localStorage.getItem("gridData"));
  for (var i =0;i<mainGrid.length;i++) {
    if (mainGrid[i].Status == "Waiting for Override") {
          pendingArr.push(mainGrid[i]);
    }
  }
 }
     return pendingArr.length;
};

return {
  getBadgeCount:getBadgeCount
} 
       
}]);
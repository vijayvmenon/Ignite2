angular.module('ignite2.override', ['LocalStorageModule'])

.controller('overrideCntrl', ['$scope','$http','$ionicPopup','localStorageService', '$stateParams', '$state', function($scope,$http,$ionicPopup,localStorageService,$stateParams,$state){
	

         $scope.override_count= 0;

$scope.reloadRoute = function() {
    $state.reload();
};

  if(localStorage.getItem('gridData') !== null) {
	$scope.mainData=JSON.parse(localStorage.getItem("gridData"));
	console.log($scope.mainData);


     $scope.suprvsrArr=[];
	for (var i =0;i<$scope.mainData.length;i++) {
		if ($scope.mainData[i].Status == "Waiting for Override") {
          $scope.suprvsrArr.push($scope.mainData[i]);
          $scope.override_count++;
		}
	}
}

$scope.apprvData=JSON.parse(localStorage.getItem("apprData"));

  console.log($scope.apprvData);


$scope.approve=function(item) {

for (var i=0;i<$scope.mainData.length;i++) { 
  if ($scope.mainData[i].PoNbr == item.PoNbr && $scope.mainData[i].ItemNbr == item.ItemNbr && $scope.mainData[i].DeliveryNo == item.DeliveryNo) {
$scope.mainData[i].Status="Approved by Manager";
$scope.mainData[i].isLocked=false;
//console.log($scope.mainData);
localStorage.setItem("gridData",JSON.stringify($scope.mainData))
 //console.log(localStorage.getItem("gridData"));

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
}

}]);
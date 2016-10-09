angular.module('ignite2.override', ['LocalStorageModule'])

.controller('overrideCntrl', ['$scope','$http','localStorageService', '$stateParams', '$state', function($scope,$http,localStorageService,$stateParams,$state){
	
	$scope.mainData=JSON.parse(localStorage.getItem("gridData"));
	console.log($scope.mainData);

     $scope.suprvsrArr=[];
	for (var i =0;i<$scope.mainData.length;i++) {
		if ($scope.mainData[i].Status == "Waiting for Override") {
          $scope.suprvsrArr.push($scope.mainData[i]);
		}
	}

$scope.details=$stateParams.detailData;

console.log($scope.details);

$scope.approve=function() {

for (var i =0;i<$scope.mainData.length;i++) { 
  if ($scope.mainData[i].PoNbr == $scope.details.PoNbr && $scope.mainData[i].ItemNbr ==$scope.details.ItemNbr && $scope.mainData[i].DeliveryNo == $scope.details.DeliveryNo) {
$scope.mainData[i].Status="Approved by Manager";
$scope.mainData[i].isLocked=false;
console.log($scope.mainData);
localStorage.setItem("gridData",JSON.stringify($scope.mainData))
   }
 }
 console.log(localStorage.getItem("gridData"))
}

}])
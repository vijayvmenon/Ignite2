angular.module('ignite2.override', ['LocalStorageModule'])

.controller('overrideCntrl', ['$scope','$http','$ionicPopup','localStorageService', '$stateParams', '$state', function($scope,$http,$ionicPopup,localStorageService,$stateParams,$state){
	
  if(localStorage.getItem('gridData') !== null) {
	$scope.mainData=JSON.parse(localStorage.getItem("gridData"));
	console.log($scope.mainData);
	console.log($scope.apprvData)

     $scope.suprvsrArr=[];
	for (var i =0;i<$scope.mainData.length;i++) {
		if ($scope.mainData[i].Status == "Waiting for Override") {
          $scope.suprvsrArr.push($scope.mainData[i]);
		}
	}
}

$scope.apprvData=JSON.parse(localStorage.getItem("apprData"));
$scope.details=$stateParams.detailData;
$scope.showpen=$stateParams.showpending;
$scope.showapp=$stateParams.showapproved;

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
 console.log(localStorage.getItem("gridData"));

 //Below logic is to push the Approve by Manager data to a new Array and store it 
if(localStorage.getItem('apprData') === null) {
var a = [];
a.push($scope.details);
localStorage.setItem('apprData', JSON.stringify(a));
}
else {
    var a = [];
    a = JSON.parse(localStorage.getItem('apprData'));
    a.push($scope.details);
    localStorage.setItem('apprData', JSON.stringify(a));
 }
}


$scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       template: 'Override Request for PO - ' + $scope.details.PoNbr + ',Delivery - ' + $scope.details.DeliveryNo + ' and Item - ' + $scope.details.ItemNbr + ' approved.'
     });
     alertPopup.then(function(res) {
       console.log('Dialog closed');
     });
   };

}])
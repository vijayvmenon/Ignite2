angular.module('ignite2.supervisorSearch')

.controller('poDetailsController', ['$scope','$state','$rootScope','$stateParams','$interval','dataFactory',function($scope,$state,$rootScope,$stateParams,$interval,dataFactory){
	

	//$scope.displayedAppointments=[];
	$scope.ponbr=dataFactory.supwikitext[0];
$scope.text="test iframe";
$scope.resizeIframe = function (event) {
    console.log("iframe loaded!");
    var iframe = event.target;
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
};

window.scopeToShare = $scope;
	  dataFactory.get('templates/Supervisor/supervisorWiki/searchinput.json').then(function(data) {
           $scope.items= data;
           console.log($scope.items);

	  for (var i=0;i<$scope.items.length;i++) {
	  	if($scope.items[i].id == $scope.ponbr) {
	  		$scope.appointments=$scope.items[i].appointments;
	  		window.scopeToShare = $scope;
	  		//$scope.displayedAppointments=$scope.items[i].appointments;
	  		$scope.poitems = $scope.items[i].items;
	  	}
	  }

    $scope.totappts=$scope.appointments.length;
    $scope.totitems=$scope.poitems.length;
//Below two values are for linear progress bar showing due qty
	$scope.rcvqty=0;
	$scope.totqty=0;
	$scope.dueqty=0;
for (var j =0; j<$scope.poitems.length;j++) {
	$scope.totqty+=$scope.poitems[j].totqty;
	$scope.dueqty+=$scope.poitems[j].dueqty;
}
$scope.rcvqty=$scope.totqty - $scope.dueqty;

  });

    $scope.finished = function(){
        // Finish callback
    };  
}]);

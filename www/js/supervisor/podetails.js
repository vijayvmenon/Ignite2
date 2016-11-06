angular.module('ignite2.supervisorSearch')

.controller('poDetailsController', ['$scope','$state','$rootScope','$stateParams','$interval','dataFactory',function($scope,$state,$rootScope,$stateParams,$interval,dataFactory){
	
	
	$scope.ponbr=dataFactory.supwikitext[0];

	  dataFactory.get('templates/Supervisor/supervisorWiki/searchinput.json').then(function(data) {
           $scope.items= data;
           console.log($scope.items);

	  for (var i=0;i<$scope.items.length;i++) {
	  	if($scope.items[i].id == $scope.ponbr) {
	  		$scope.appointments=$scope.items[i].appointments;
	  		$scope.poitems = $scope.items[i].items;
	  		$scope.cancel_date=$scope.items[i].cancel_date;
           console.log($scope.appointments+$scope.poitems+$scope.cancel_date);
	  	}
	  }

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


//var dat=new Date().
//Below logic is for countdown clock showing ETA

    $scope.finished = function(){
        // Finish callback
    };  
		

}]);

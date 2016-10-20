angular.module('ignite2.managerDashboard')


.controller('manRemedyCrqCntrl', ['$scope',function($scope){
	
  $scope.opentickets=15;
  $scope.totaltickets=27;
  $scope.opencrqs=3;
  $scope.totalcrqs=5;
  $scope.recvticketcount=4;
  $scope.shipticketcount=3;
  $scope.qaticketcount=5
  $scope.opticketcount=3;
  $scope.networkcrqcount=1;
  $scope.unixcrqcount=1;
  $scope.glscrqcount=1;
}])


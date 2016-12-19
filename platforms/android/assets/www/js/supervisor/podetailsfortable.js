angular.module('supervisorSearchPo',['datatables'])

.controller('poDetailsTable', function($scope,$window,DTOptionsBuilder,DTColumnDefBuilder,DTDefaultOptions){

var parentScope = $window.parent.angular.element($window.frameElement).scope();
$scope.appointments=window.top.scopeToShare.appointments;
$scope.poitems=window.top.scopeToShare.poitems;
	console.log(DTOptionsBuilder);
//	DTDefaultOptions.setDisplayLength(7);
$scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('frtp');
});

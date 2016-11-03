angular.module('ignite2.supervisorSearch')

.controller('userDetailsController', ['$scope','$state','$stateParams', 'dataFactory',function($scope,$state,$stateParams,dataFactory){
	
	$scope.userid=dataFactory.supwikitext[0];
	console.log('reached user details supervisor');
	console.log(dataFactory.supwikitext[0]);
}]);
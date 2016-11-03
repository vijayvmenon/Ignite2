angular.module('ignite2.supervisorSearch')

.controller('poDetailsController', ['$scope','$state','$stateParams', 'dataFactory',function($scope,$state,$stateParams,dataFactory){
	
	$scope.ponbr=dataFactory.supwikitext[0];
	console.log('reached item details supervisor');
	console.log(dataFactory.supwikitext[0]);
}]);
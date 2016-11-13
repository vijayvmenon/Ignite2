angular.module('ignite2.supervisorSearch', ['LocalStorageModule','nvd3','isteven-omni-bar','angular-svg-round-progressbar','fmp-card','nvd3ChartDirectives','n3-pie-chart','circle.countdown','smart-table'])


.controller('TypeAheadController', function($scope,$rootScope,$interval,$state,$stateParams,dataFactory) { // DI in action
  $interval.cancel($rootScope.supOverrideInterval);
  dataFactory.get('templates/Supervisor/supervisorWiki/searchinput.json').then(function(data) {
    $scope.items = data;
  });
  
  $scope.showitem=dataFactory.showitem;
    $scope.showpo=dataFactory.showpo;
    $scope.showuser=dataFactory.showuser;
  $scope.name =[]; // This will hold the selected item
  $scope.onItemSelected = function() { // this gets executed when an item is selected
  	  dataFactory.supwikitext=$scope.name;
     console.log('selected=' + $scope.name[0] + $scope.name[1]);
     if ( $scope.name[1] == "item") {
         $scope.showitem=true;
         $scope.showpo=false;
         $scope.showuser=false;         
     }
     if ( $scope.name[1] == "po") {
         $scope.showitem=false;
         $scope.showpo=true;
         $scope.showuser=false;         
     }
     if ( $scope.name[1] == "user") {
         $scope.showitem=false;
         $scope.showpo=false;
         $scope.showuser=true;         
     }     

    //$state.go('suprvsrApp.search.item',{itemnbr:$scope.name});
  };
})


.factory('dataFactory', function($http) {
  return {
    get: function(url) {
      return $http.get(url).then(function(resp) {
        return resp.data; // success callback returns this
      });
    },
    supwikitext:null,
    showitem:false,
    showpo:false,
    showuser:false
  };
})

.directive('typeahead', function($timeout) {
  return {
    restrict: 'AEC',
    scope: {
		items: '=',
		prompt:'@',
		title: '@',
		subtitle: '@',
		model: '=',
		onSelect:'&'
	},
	link:function(scope,elem,attrs){
	   scope.handleSelection=function(selectedItem){
		 scope.model=selectedItem;	 
		 scope.current=0;
		 scope.selected=true;        
		 $timeout(function(){
			 scope.onSelect();
		  },200);
	  };
	  scope.current=0;
	  scope.selected=true;
	  scope.isCurrent=function(index){
		 return scope.current==index;
	  };
	  scope.setCurrent=function(index){
		 scope.current=index;
	  };
	},
    templateUrl: 'templates/Supervisor/supervisorWiki/supervisorSearchTemplate.html'
  }
});


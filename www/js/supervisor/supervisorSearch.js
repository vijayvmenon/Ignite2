angular.module('ignite2.supervisorSearch', ['LocalStorageModule','nvd3','isteven-omni-bar','angular-svg-round-progressbar','fmp-card','nvd3ChartDirectives','n3-pie-chart','circle.countdown','smart-table','ion-autocomplete','ngIframeResizer'])


.controller('TypeAheadController', function($scope,$state,$rootScope,$interval,$state,$ionicPopup,$stateParams,dataFactory,$cordovaBarcodeScanner) { // DI in action


//Below Logic is for Barcode Scanner for Supervisor Search Mobile Version
 // $scope.choices = ["item","po","user"];
$scope.reloadpage = function() {
  $state.reload('suprvsrApp.search');
  console.log('supervisor search reloaded');
}

$scope.scanClick = function() {
  console.log('reached scan function');
    $scope.choice = {
    value:'user'
  };

$scope.selectedradio=$scope.choice.value;

$scope.radioFunc= function() {
 $scope.selectedradio=$scope.choice.value;  
};

  console.log('reached scan');
  document.addEventListener("deviceready", function () {

    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {

    if (barcodeData.text != "") {
 $ionicPopup.confirm({
      templateUrl: 'templates/Supervisor/supervisorWiki/supsearchpopup.html',
      title: 'Scanned Barcode - ' + barcodeData.text,
      scope: $scope,
      buttons: [{
        text: 'OK',
        type: 'button-positive',
        onTap: function (e) {
          $scope.scanClickedMethod(barcodeData.text,$scope.selectedradio);
        }
      }, {
        text: 'Cancel',
        type: 'button-default',
        onTap: function (e) {
          $state.go('suprvsrApp.search');
        }
      }]
    });
}
      }, function(error) {
        // An error occurred
      });
});

}
//End of Logic


$scope.showclear=dataFactory.showclear;

    var getRandomInt=function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

$scope.styleonLoad= function() {
  if ( $scope.showclear) 
  styl = {"width":'80%'};  
else 
  styl = {"width":'100%'};  
return styl;
}



$scope.url_param=getRandomInt(1,1000);
 // $interval.cancel($rootScope.supOverrideInterval);
 $scope.items=[];
 var returneditems=[];
   $scope.name =[]; // This will hold the selected item

   $scope.showitem=dataFactory.showitem;
    $scope.showpo=dataFactory.showpo;
    $scope.showuser=dataFactory.showuser;

  dataFactory.get('templates/Supervisor/supervisorWiki/searchinput.json').then(function(data) {
    returneditems = data;  //this is used for mobile screen
      $scope.items = data;  //this is used for typeahead directive angularjs in web screen
  });

  $scope.getItemPoUser = function(query) {
    //console.log(returneditems);
    if (query) {
      $scope.mobitems=[];
    for (var i=0;i<returneditems.length;i++) {
          if (returneditems[i].id.toString().indexOf(query.toString()) !== -1) {
            $scope.mobitems.push(returneditems[i].id + " : " + returneditems[i].category);
           // console.log($scope.items);
          }
        }
          return {
          items: $scope.mobitems
              };
    }
  return {items: []};
  };


$scope.clickedMethod = function(callback) {
  $scope.showclear=true;
    console.log(dataFactory.supwikitext);
   $scope.name=[callback.item.split(':')[0].slice(0,-1),callback.item.split(':')[1].slice(1)];
    dataFactory.supwikitext=$scope.name;
    console.log(dataFactory.supwikitext);
   //console.log('selected=' + $scope.name[0] + $scope.name[1]);
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
};

//Clicked Method for Scan


$scope.scanClickedMethod = function(data,category) {
  $scope.showclear=true;
    console.log(dataFactory.supwikitext);
   $scope.name=[data,category];
    dataFactory.supwikitext=$scope.name;
    console.log(dataFactory.supwikitext);
   //console.log('selected=' + $scope.name[0] + $scope.name[1]);
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
};
  
  $scope.onItemSelected = function() { // this gets executed when an item is selected
      $scope.showclear=true;
  	  dataFactory.supwikitext=$scope.name;
     console.log('selected=' + dataFactory.supwikitext[0] + dataFactory.supwikitext[1]);
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
    showuser:false,
    showclear:false
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


angular.module('ignite2.managerDashboard')


.controller('manTripCntrl', ['$scope','manTripSvc',function($scope,manTripSvc){


$scope.manTripSvc=manTripSvc;

$scope.showcasefn=function() {
$scope.manTripSvc.showCasePick=true;
$scope.manTripSvc.showFullPull=false;
$scope.manTripSvc.showChase=false;
$scope.manTripSvc.showRegularPbyl=false;
};

$scope.showfullpullfn=function() {
$scope.manTripSvc.showCasePick=false;
$scope.manTripSvc.showFullPull=true;
$scope.manTripSvc.showChase=false;
$scope.manTripSvc.showRegularPbyl=false;
};

$scope.showchasefn=function() {
$scope.manTripSvc.showCasePick=false;
$scope.manTripSvc.showFullPull=false;
$scope.manTripSvc.showChase=true;
$scope.manTripSvc.showRegularPbyl=false;
};

$scope.showregpbylfn=function() {
$scope.manTripSvc.showCasePick=false;
$scope.manTripSvc.showFullPull=false;
$scope.manTripSvc.showChase=false;
$scope.manTripSvc.showRegularPbyl=true;
};

//Casepick 

   $scope.case_options = {
            chart: {
                type: 'pieChart',
                height: 400,
                width: 380,
                x: function(d){return d.key;},
                y: function(d){return d.value;},
                valueFormat:d3.format(".0f"),
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            },
        title: {
        enable: true,
        text: 'Trip Stats - Case Pick'
        }
        };

        $scope.case_data = [{key: "Unassigned",value: 50},{key: "Pick In Progress",value: 120},{key: "Hold",value: 30},{key: "Closed",value: 40},
        {key: "Billed",value: 230}];
          


//Fullpull


   $scope.full_options = {
            chart: {
                type: 'pieChart',
                height: 400,
                width: 380,
                x: function(d){return d.key;},
                y: function(d){return d.value;},
                valueFormat:d3.format(".0f"),
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            },
        title: {
        enable: true,
        text: 'Trip Stats - Full Pull'
        }
        };

        $scope.full_data = [{key: "Unassigned",value: 120},{key: "Pick In Progress",value: 30},{key: "Hold",value: 23},{key: "Closed",value: 25},
        {key: "Billed",value: 130}];

        
  //Chase


   $scope.chase_options = {
            chart: {
                type: 'pieChart',
                height: 400,
                width: 380,
                x: function(d){return d.key;},
                y: function(d){return d.value;},
                valueFormat:d3.format(".0f"),
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            },
          title: {
        enable: true,
        text: 'Trip Stats - Chase'
        }
        };

        $scope.chase_data = [{key: "Unassigned",value: 50},{key: "Pick In Progress",value: 10},{key: "Hold",value: 0},{key: "Closed",value: 6},
        {key: "Billed",value: 30}];

        
        //Regular PBYL


   $scope.regpbyl_options = {
            chart: {
                type: 'pieChart',
                height: 400,
                width: 380,
                x: function(d){return d.key;},
                y: function(d){return d.value;},
                valueFormat:d3.format(".0f"),
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            },
                title: {
        enable: true,
        text: 'Trip Stats - Regular PBYL'
        }
        };


        $scope.regpbyl_data = [{key: "Unassigned",value: 7},{key: "Pick In Progress",value: 2},{key: "Hold",value: 0},{key: "Closed",value: 0},
        {key: "Billed",value: 7}];
}])


.factory('manTripSvc', function(){
  return {
  showCasePick:true,
    showFullPull:false,
    showChase:false,
    showRegularPbyl:false
  }
});


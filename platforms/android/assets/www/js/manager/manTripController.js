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

var getRandomInt=function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Casepick 

   $scope.case_options = {
            chart: {
                type: 'pieChart',
                height: 400,
                width: 430,
                margin : {
                    left:-20
                },
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
                        right: 10,
                        bottom: 5,
                        left:-30
                    }
                }
            },
        title: {
        enable: true,
        text: 'TRIP STATS - CASE PICK',
        css: {
            'text-align': 'left',
            'margin': '10px 13px 0px 7px',
            'font-size':'16px',
            'color':'#29B4B6',
            'font-width':'bold',
            'font-family':'segoe ui'
        }
        }
        };


        $scope.case_data = [{key: "Unassigned",value: getRandomInt(20,150)},{key: "Picking",value: getRandomInt(40,200)},
        {key: "Hold",value: getRandomInt(30,50)},{key: "Closed",value: getRandomInt(60,300)},{key: "Billed",value: getRandomInt(80,350)}];
          


//Fullpull


   $scope.full_options = {
            chart: {
                type: 'pieChart',
                height: 400,
                width: 400,
                margin : {
                    left:-20
                },
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
                        right: 10,
                        bottom: 5,
                        left: 0
                    }
                }
            },
        title: {
        enable: true,
        text: 'TRIP STATS - FULL PULL',
        css: {
            'text-align': 'left',
            'margin': '10px 13px 0px 7px',
            'font-size':'16px',
            'color':'#29B4B6',
            'font-width':'bold',
            'font-family':'segoe ui'
        }

        }
        };


            $scope.full_data = [{key: "Unassigned",value: getRandomInt(20,100)},{key: "Picking",value: getRandomInt(50,200)},
            {key: "Hold",value: getRandomInt(10,30)},{key: "Closed",value: getRandomInt(50,100)},{key: "Billed",value: getRandomInt(200,300)}];


        
  //Chase


   $scope.chase_options = {
            chart: {
                type: 'pieChart',
                height: 400,
                width: 400,
                margin : {
                    left:-20
                },
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
                        right: 10,
                        bottom: 5,
                        left: 0
                    }
                }
            },
          title: {
        enable: true,
        text: 'TRIP STATS - CHASE',
        css: {
            'text-align': 'left',
            'margin': '10px 13px 0px 7px',
            'font-size':'16px',
            'color':'#29B4B6',
            'font-width':'bold',
            'font-family':'segoe ui'
        }

        }
        };

                  $scope.chase_data = [{key: "Unassigned",value: getRandomInt(10,25)},{key: "Picking",value: getRandomInt(20,80)},
                {key: "Hold",value: getRandomInt(0,10)},{key: "Closed",value: getRandomInt(20,40)},{key: "Billed",value: getRandomInt(10,20)}]; 

        
        //Regular PBYL


   $scope.regpbyl_options = {
            chart: {
                type: 'pieChart',
                height: 400,
                width: 400,
             margin : {
                    left:-20
                },
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
                        right: 10,
                        bottom: 5,
                        left: 0
                    }
                }
            },
                title: {
        enable: true,
        text: 'TRIP STATS - REGULAR PBYL',
        css: {
            'text-align': 'left',
            'margin': '10px 13px 0px 7px',
            'font-size':'16px',
            'color':'#29B4B6',
            'font-width':'bold',
            'font-family':'segoe ui'
        }

        }
        };

        $scope.regpbyl_data = [{key: "Unassigned",value: getRandomInt(0,20)},{key: "Picking",value: getRandomInt(10,40)},
        {key: "Hold",value: getRandomInt(5,20)},{key: "Closed",value: getRandomInt(8,28)},{key: "Billed",value: getRandomInt(10,50)}];




 var getArrSum = function(arr) {
    var sum=0;

   for (var i =0;i< arr.length;i++) {
   sum+=arr[i].value;
}
return sum;
}


var getAssgnHoldSum = function(arr) {
    var unassign=0;
    var hold=0;
   for (var i =0;i< arr.length;i++) {
    if (arr[i].key == "Unassigned") 
      unassign+=arr[i].value;
      if (arr[i].key == "Hold") 
       hold+=arr[i].value;
}
return [unassign,hold];
}

$scope.total_trips=getArrSum($scope.regpbyl_data)+getArrSum($scope.full_data)+getArrSum($scope.chase_data)+getArrSum($scope.case_data);
$scope.total_unassign=getAssgnHoldSum($scope.regpbyl_data)[0]+getAssgnHoldSum($scope.full_data)[0]+getAssgnHoldSum($scope.chase_data)[0]+getAssgnHoldSum($scope.case_data)[0];
$scope.total_hold=getAssgnHoldSum($scope.regpbyl_data)[1]+getAssgnHoldSum($scope.full_data)[1]+getAssgnHoldSum($scope.chase_data)[1]+getAssgnHoldSum($scope.case_data)[1];

//console.log($scope.case_data);
//console.log($scope.full_data);
//console.log($scope.chase_data);
//console.log($scope.regpbyl_data);
//console.log($scope.total_trips);
//console.log($scope.total_unassign);
//console.log($scope.total_hold);

$scope.unassign_per=Math.round(($scope.total_unassign*100)/$scope.total_trips);
$scope.hold_per=Math.round(($scope.total_hold*100)/$scope.total_trips);
//console.log($scope.unassign_per);
//console.log($scope.hold_per);

$scope.emptyStyle={ 
    backgroundColor: "#4ce600"
};

}])


.factory('manTripSvc', function(){
  return {
  showCasePick:true,
    showFullPull:false,
    showChase:false,
    showRegularPbyl:false
  }
});


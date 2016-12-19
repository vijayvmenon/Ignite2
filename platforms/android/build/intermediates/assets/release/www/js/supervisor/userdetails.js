angular.module('ignite2.supervisorSearch')

.controller('userDetailsController', ['$scope','$state','$stateParams', 'dataFactory',function($scope,$state,$stateParams,dataFactory){
	
    $scope.nouser=true;
    var returneditems=[];
	$scope.userid=dataFactory.supwikitext[0];

	$scope.isHigh=false;
	$scope.isLow=false;
    $scope.userdetails={"UserID":$scope.userid,"Name":"John Doe","Role":"Receiving Associate","Supervisor":"Jane Doe","ActiveDate":"03/15/2016"};
	console.log(dataFactory.supwikitext[0]);

      dataFactory.get('templates/Supervisor/supervisorWiki/searchinput.json').then(function(data) {
   returneditems = data;  //this is used for mobile screen
   console.log(data);
   // for (var i=0;i<data.length;i++) {
      //  returneditems.push(data[i].id);
  //  }
    console.log(returneditems);
    console.log($scope.userid);
   // $scope.userid="erefef12";
  //  console.log(returneditems.indexOf('$scope.itemnbr') > -1);
  for (var j=0;j<returneditems.length;j++) {
    if ( returneditems[j].category == "user" ) {
    if ($scope.userid == returneditems[j].id || $scope.userid == "returneditems[j].id" ) {
        console.log($scope.userid+'exists');
      $scope.nouser=false;
    }
  }
    }
  });


var getRandomInt=function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var getRandomFloat=function(min, max) {
    return ((Math.random() * (max - min + 1)) + min).toFixed(2);
}


function randomTime(start, end) {
    // get the difference between the 2 dates, multiply it by 0-1, 
    // and add it to the start date to get a new date 
    var diff =  end.getTime() - start.getTime();
    var new_diff = diff * Math.random();
    var date = new Date(start.getTime() + new_diff).toLocaleTimeString("en-us");
    return date;
}

var datt=new Date().getTime();
var dat=new Date(datt).toISOString().slice(5,10).replace("-","/");
var oneday=24*60*60*1000;
var dat1=new Date(datt - (oneday*1)).toISOString().slice(5,10).replace("-","/");
var dat2=new Date(datt - (oneday*2)).toISOString().slice(5,10).replace("-","/");
var dat3=new Date(datt - (oneday*3)).toISOString().slice(5,10).replace("-","/");
var dat4=new Date(datt - (oneday*4)).toISOString().slice(5,10).replace("-","/");
var dat5=new Date(datt - (oneday*5)).toISOString().slice(5,10).replace("-","/");
var dat6=new Date(datt - (oneday*6)).toISOString().slice(5,10).replace("-","/");

var datArr=[dat,dat1,dat2,dat3,dat4,dat5,dat6];


$scope.usertimedetails=[];

for ( var i =0;i<7;i++) {
$scope.usertimedetails.push({"checkin":randomTime(new Date("11-20-2016 07:00"), new Date("11-20-2016 07:30")),
	"lcheckout":randomTime(new Date("11-20-2016 11:00"), new Date("11-20-2016 11:30")),
	"lcheckin":randomTime(new Date("11-20-2016 11:45"), new Date("11-20-2016 12:00")),
	"checkout":randomTime(new Date("11-20-2016 16:00"), new Date("11-20-2016 18:00")),"date":datArr[i]});
}

console.log($scope.usertimedetails);




//For web and Mobile - LineChart
//*******************************************
//*********************************************

var rcvArr=[];
//var shpArr=[];
var dat=new Date().getTime();
var oneday=24*60*60*1000;
var future=dat+oneday;
   rcvArr.push([future,0]);
rcvArr.push([dat,getRandomInt(50,100)]);

//shpArr.push({"date":dat,"value":getRandomInt(250,350)});

for (var h=1;h<30;h++) {
   this["dat"+h] = dat - (oneday*h);
    rcv=getRandomInt(50,100);
   // shp=getRandomInt(250,350);
    rcvArr.push([this["dat"+h],rcv]);
   // shpArr.push({"date":this["dat"+h],"value":shp});
}

var yester=dat - (oneday*30)
 rcvArr.push([yester,0]);

var rcvArrOrig=rcvArr.reverse();
//var shpArrOrig=shpArr.reverse();

 $scope.user_data = [
            {
                key: "Received Cases",
                "bar": true,
                values: rcvArrOrig
            }
         /**   {
                key: "Shipped Cases",
                values: shpArrOrig
            }**/
            ];

$scope.todayrate=$scope.user_data[0].values[30][1];
$scope.yesterate=$scope.user_data[0].values[29][1];

if ($scope.todayrate > $scope.yesterate) {
	$scope.percent=(($scope.todayrate - $scope.yesterate)*100/$scope.yesterate).toFixed(1);
$scope.isHigh=true;
}

if ($scope.todayrate < $scope.yesterate) {
	$scope.percent=(($scope.yesterate - $scope.todayrate)*100/$scope.yesterate).toFixed(1);
	$scope.isLow=true;
}

//console.log($scope.user_data);
$scope.user_options = {
            chart: {
                type: 'historicalBarChart',
                height: 450,
                width:800,
                margin : {
                    top: 20,
                    right:0,
                    bottom: 65,
                    left:50
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                duration: 100,
                xAxis: {
                    axisLabel: 'Date',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 30,
                    showMaxMin: true
                },
                yAxis: {
                    axisLabel: 'Received Cases',
                    axisLabelDistance: -10,
                    tickFormat: function(d){
                        return d3.format(',.0f')(d);
                    }
                },
                tooltip: {
                    keyFormatter: function(d) {
                        return d3.time.format('%x')(new Date(d));
                    }
                },
             //   forceX:[$scope.firstdate,$scope.lastdate]
            },

            title : {
            	enable: true,
            	text:'User '+ $scope.userid+' - ' + 'Performance Statistics'
            }


        };


      if (platform != "windows") {
            console.log('reached here');
            $scope.user_options.chart.height=400;
            $scope.user_options.chart.width=400;
           $scope.user_options.chart.margin.left=50;
              $scope.user_options.chart.margin.right=10;
               $scope.user_options.chart.xAxis.showMaxMin=false  
             // $scope.itemgraphline_options.chart.margin.top=0;
              //$scope.itemgraphline_options.chart.margin.bottom=0;
         }

         
}]);
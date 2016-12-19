angular.module('ignite2.supervisorSearch')

.controller('itemDetailsController', ['$scope','$state','$stateParams','dataFactory',function($scope,$state,$stateParams,dataFactory){

$scope.noitem=true;

console.log(platform);
var returneditems=[];
	$scope.itemnbr=dataFactory.supwikitext[0];

	console.log('reached item details supervisor');
	console.log(dataFactory.supwikitext[0]);

      dataFactory.get('templates/Supervisor/supervisorWiki/searchinput.json').then(function(data) {
   returneditems = data;  //this is used for mobile screen
   console.log(data);
    //for (var i=0;i<data.length;i++) {
    //    returneditems.push(data[i].id);
   // }
    console.log(returneditems);
    console.log($scope.itemnbr);
  //  $scope.itemnbr=233465436;
  //  console.log(returneditems.indexOf('$scope.itemnbr') > -1);
  for (var j=0;j<returneditems.length;j++) {
        if ( returneditems[j].category == "item" ) {
    if ($scope.itemnbr == returneditems[j].id || $scope.itemnbr == "returneditems[j].id" ) {
        console.log($scope.itemnbr+'exists');
      $scope.noitem=false;
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


//For web and Mobile - LineChart
//*******************************************
//*********************************************

var rcvArr=[];
var shpArr=[];
var dat=new Date()
var oneday=24*60*60*1000;

rcvArr.push({"date":dat,"value":getRandomInt(200,400)});

shpArr.push({"date":dat,"value":getRandomInt(250,350)});

for (var h=1;h<30;h++) {
   this["dat"+h] = dat - (oneday*h);
    rcv=getRandomInt(200,400);
    shp=getRandomInt(250,350);
    rcvArr.push({"date":this["dat"+h],"value":rcv});
    shpArr.push({"date":this["dat"+h],"value":shp});
}

var rcvArrOrig=rcvArr.reverse();
var shpArrOrig=shpArr.reverse();

 $scope.itemgraphline_data = [
            {
                key: "Received Cases",
                values: rcvArrOrig
            },
            {
                key: "Shipped Cases",
                values: shpArrOrig
            }
            ];


$scope.itemgraphline_options = {
    chart: {
        type: 'lineChart',
        height: 450,
       margin : {
            top: 20,
            right: 20,
            bottom: 50,
            left:100
        },
        legend: {
            margin: {
                top:5,
                bottom:15
            }
        },

        x: function(d){ return d.date},
        y: function(d){ return d.value },
        color: d3.scale.category10().range(),
        duration: 300,
        clipVoronoi: false,
        xAxis: {
           axisLabel: 'Date',

           rotateLabels: -45,
            tickFormat: function(d) {
                        return d3.time.format('%m/%d/%y')(new Date(d))
                   },
               showMaxMin: false,
               staggerLabels: true
        },
        reduceXTicks: false,
        yAxis: {
            axisLabel: 'Number of Cases',
            axisLabelDistance:5,
             tickFormat: function(d){
           return d3.format(',.f')(d)
           // console.log(d)
        },
     },
            useInteractiveGuideline:true,
            interactiveLayer: {
              tooltip: {
                gravity:"s"
              }
            }
      },

    title: {
        enable: true,
        text: 'Item '+$scope.itemnbr+' - Past 30 Days Movement'
        },
};


        if (platform != "windows") {
            console.log('reached here');
            $scope.itemgraphline_options.chart.height=400;
            $scope.itemgraphline_options.chart.width=400;
           $scope.itemgraphline_options.chart.margin.left=70;
              $scope.itemgraphline_options.chart.margin.right=20;  
             // $scope.itemgraphline_options.chart.margin.top=0;
              //$scope.itemgraphline_options.chart.margin.bottom=0;
         }


//For web - Pie Chart 
//*************************************
//**************************************


        $scope.itemStorePie_data = [{key: "Planned",value: getRandomInt(5,20)},{key: "Orderfilled",value: getRandomInt(5,20)},
        {key: "Billed",value: getRandomInt(5,15)},{key: "Not Released",value: getRandomInt(5,30)},
        {key: "Released",value: getRandomInt(5,10)},{key: "OF in Progress",value: getRandomInt(5,25)}];

         $scope.itemPoPie_data = [{key: "Received",value: getRandomInt(5,20)},{key: "Freight Billed",value: getRandomInt(5,20)},
         {key: "Not Arrived",value: getRandomInt(3,9)}];




           $scope.itemStorePie_options = {
            chart: {
                type: 'pieChart',
             //   height: 400,
               // width: 500,
                margin : {
                    left:0
                },
                x: function(d){return d.key;},
                y: function(d){return d.value;},
                valueFormat:d3.format(".0f"),
                showLabels: false,
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
        text: 'Item-Store Stats - '+$scope.itemnbr
        }
        };
       

       $scope.itemPoPie_options = {
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
                showLabels: false,
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
        text: 'Item-PO Stats - '+$scope.itemnbr
        }
        };

        if (platform == "windows") {
            $scope.itemStorePie_options.chart.height=400;
            $scope.itemStorePie_options.chart.width=500;
             $scope.itemStorePie_options.chart.margin.left=0;
              $scope.itemStorePie_options.chart.margin.right=0;
              $scope.itemStorePie_options.chart.margin.top=0;
              $scope.itemStorePie_options.chart.margin.bottom=0;
         }

         else {
            $scope.itemStorePie_options.chart.height=400;
            $scope.itemStorePie_options.chart.width=400;
             $scope.itemStorePie_options.chart.margin.left=-20;
              $scope.itemStorePie_options.chart.margin.right=0;
              $scope.itemStorePie_options.chart.margin.top=0;
              $scope.itemStorePie_options.chart.margin.bottom=0;  
             $scope.itemStorePie_options.chart.legend.margin.left=0;
              $scope.itemStorePie_options.chart.legend.margin.right=0;
              $scope.itemStorePie_options.chart.legend.margin.top=10;
              $scope.itemStorePie_options.chart.legend.margin.bottom=0;   

            $scope.itemPoPie_options.chart.height=400;
            $scope.itemPoPie_options.chart.width=400;
             $scope.itemPoPie_options.chart.margin.left=-20;
              $scope.itemPoPie_options.chart.margin.right=0;
              $scope.itemPoPie_options.chart.margin.top=0;
              $scope.itemPoPie_options.chart.margin.bottom=0;  
             $scope.itemPoPie_options.chart.legend.margin.left=-40;
              $scope.itemPoPie_options.chart.legend.margin.right=0;
              $scope.itemPoPie_options.chart.legend.margin.top=10;
              $scope.itemPoPie_options.chart.legend.margin.bottom=0;            
         }
       
//For Web - linePluBar Chart
//*********************************************
//*********************************************

var qtyArrtemp=[];
var pricArrtemp=[];
var dat=new Date().getTime();
var oneday=24*60*60*1000;
qtyArrtemp.push([dat,getRandomInt(3000,8000)]);
pricArrtemp.push([dat,getRandomFloat(200,300)]);
for (var h=1;h<91;h++) {
   this["dat"+h] = dat - (oneday*h);
    qty=getRandomInt(3000,8000);
    pric=getRandomFloat(200,300);
    qtyArrtemp.push([this["dat"+h],qty]);
    pricArrtemp.push([this["dat"+h],pric]);
}

qtyArr=qtyArrtemp.reverse();
pricArr=pricArrtemp.reverse();

        $scope.itemgraphlinebar_data = [
            {
                "key" : "Cases" ,
                "bar": true,
                "values" : qtyArr
            },
            {
                "key" : "WAC" ,
                "values" : pricArr
            }
        ].map(function(series) {
                series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
                return series;
            });

//console.log($scope.itemgraph_data);
$scope.itemgraphlinebar_options = {
            chart: {
                type: 'linePlusBarChart',
                height: 500,
                width:700,
                margin: {
                    top: 30,
                    right: 75,
                    bottom: 50,
                    left: 75
                },
                bars: {
                    forceY: [0]
                },
                bars2: {
                    forceY: [0]
                },
                color: ['#2ca02c', 'darkred'],
                x: function(d,i) { return i },
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        var dx = $scope.itemgraphlinebar_data[0].values[d] && $scope.itemgraphlinebar_data[0].values[d].x || 0;
                        if (dx > 0) {
                            return d3.time.format('%x')(new Date(dx))
                        }
                        return null;
                    }
                },
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.itemgraphlinebar_data[0].values[d] && $scope.itemgraphlinebar_data[0].values[d].x || 0;
                        return d3.time.format('%b-%Y')(new Date(dx))
                    },
                    showMaxMin: false
                },
                y1Axis: {
                    axisLabel: 'Cases',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    },
                    axisLabelDistance: 12
                },
                y2Axis: {
                    axisLabel: 'Warehouse Avg Cost',
                    tickFormat: function(d) {
                        return d3.format(',.2f')(d)
                    }
                },
                y3Axis: {
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                y4Axis: {
                    tickFormat: function(d) {
                        return d3.format(',.2f')(d) + ' Cases';
                    }
                }
            },
                title: {
        enable: true,
        text: 'Item '+$scope.itemnbr+ '- BOH-WAC Graph'
        },
        };


//For Mobile linePluBar Chart


console.log($scope.itemgraphlinebar_options.chart.height);
$scope.itemgraphmob_options = {
            chart: {
                type: 'linePlusBarChart',
                height: 500,
                width:450,
                margin: {
                    top: 30,
                    right: 95,
                    bottom: 50,
                    left: 35
                },
                           legend: {
                    margin: {
                        top: 5,
                        right:0,
                        bottom: 5,
                        left:-20
                    }
                  },
                bars: {
                    forceY: [0]
                },
                bars2: {
                    forceY: [0]
                },
                color: ['#2ca02c', 'darkred'],
                x: function(d,i) { return i },
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        var dx = $scope.itemgraphlinebar_data[0].values[d] && $scope.itemgraphlinebar_data[0].values[d].x || 0;
                        if (dx > 0) {
                            return d3.time.format('%x')(new Date(dx))
                        }
                        return null;
                    }
                },
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.itemgraphlinebar_data[0].values[d] && $scope.itemgraphlinebar_data[0].values[d].x || 0;
                        return d3.time.format('%b-%Y')(new Date(dx))
                    },
                    showMaxMin: false
                },
                y1Axis: {
                    axisLabel: 'Cases',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    },
                    axisLabelDistance: 12
                },
                y2Axis: {
                    axisLabel: 'Warehouse Avg Cost',
                    tickFormat: function(d) {
                        return d3.format(',.2f')(d)
                    }
                },
                y3Axis: {
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                y4Axis: {
                    tickFormat: function(d) {
                        return d3.format(',.2f')(d) + ' Cases';
                    }
                }
            },
                title: {
        enable: true,
        text: 'Item '+$scope.itemnbr+ '- BOH-WAC Graph'
        },
        };  
 

}]);


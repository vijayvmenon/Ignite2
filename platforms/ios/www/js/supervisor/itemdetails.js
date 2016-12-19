angular.module('ignite2.supervisorSearch')

.controller('itemDetailsController', ['$scope','$state','$stateParams','dataFactory',function($scope,$state,$stateParams,dataFactory){

	$scope.itemnbr=dataFactory.supwikitext[0];
	console.log('reached item details supervisor');
	console.log(dataFactory.supwikitext[0]);

var getRandomInt=function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var getRandomFloat=function(min, max) {
    return ((Math.random() * (max - min + 1)) + min).toFixed(2);
}

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

        $scope.itemgraph_data = [
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

console.log($scope.itemgraph_data);
$scope.itemgraph_options = {
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
                        var dx = $scope.itemgraph_data[0].values[d] && $scope.itemgraph_data[0].values[d].x || 0;
                        if (dx > 0) {
                            return d3.time.format('%x')(new Date(dx))
                        }
                        return null;
                    }
                },
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.itemgraph_data[0].values[d] && $scope.itemgraph_data[0].values[d].x || 0;
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
        text: 'Item BOH-WAC Graph'
        },
        };


//For Mobile

$scope.itemgraphmob_options = {
            chart: {
                type: 'linePlusBarChart',
                height: 500,
                width:450,
                margin: {
                    top: 30,
                    right: 90,
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
                        var dx = $scope.itemgraph_data[0].values[d] && $scope.itemgraph_data[0].values[d].x || 0;
                        if (dx > 0) {
                            return d3.time.format('%x')(new Date(dx))
                        }
                        return null;
                    }
                },
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.itemgraph_data[0].values[d] && $scope.itemgraph_data[0].values[d].x || 0;
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
        text: 'Item BOH-WAC Graph'
        },
        };
}]);


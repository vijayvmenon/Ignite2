angular.module('ignite2.managerDashboard', ['LocalStorageModule','nvd3','isteven-omni-bar','nvd3ChartDirectives'])

.controller('manDashboardSlotCntrl', ['$scope','$http','$ionicPopup','localStorageService', '$stateParams', '$state', function($scope,$http,$ionicPopup,localStorageService,$stateParams,$state){
	
    $scope.maxValue   = 100;
    $scope.loadingCurrent1 = {
    backgroundColor: "#33cc33"
}

//*******************************************************************
//             AUDIT GRAPH LOGIC
//******************************************************************* 


$scope.graph1_options = {
    chart: {
        type: 'multiBarHorizontalChart',
        height: 600,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 200
        },

        x: function(d){ return d.label; },
        y: function(d){ return d.value },
        showValues: true,
        valueFormat: function(d){
           // return d3.format()(d);
          return d + "%"; 
     //   return d3.format(',.1f')(d);
        },
        duration: 500,
        xAxis: {
            axisLabel: '    '
        },
        yAxis: {
            axisLabel: 'Percentage of Audit Completed',
          //  "showMaxMin": true,
            "tickValues": [0,100], 
          //  axisLabelDistance: -10,
            tickFormat:d3.format(),
        },
        //yDomain is used to set max range for yAxis . similar for xAxis
     yDomain: [0,100],
     //below is used to generate a custom tooltip
    useInteractiveGuideline: false,
      tooltip: {
                contentGenerator: function (e) {
                  //  console.log(e);
                  var series = e.series[0];
                  var data=e.data.label;
                  if (series.value === null) return;
                  var rows = 
                    "<tr>" +
                      "<td class='key'>" + series.key + ':' + "</td>" +
                      "<td class='x-value'>" + series.value + '%' + "</td>" + 
                    "</tr>";

                  var header = 
                    "<thead>" + 
                      "<tr>" +
                        "<td class='legend-color-guide'><div style='background-color: " + series.color + ";'></div></td>" +
                        "<td class='key'><strong>" + data + "</strong></td>" +
                      "</tr>" + 
                    "</thead>";
                    
                  return "<table>" +
                      header  +
                      "<tbody>" + 
                       rows + 
                     "</tbody>" +
                    "</table>";
              //    return series.color + "  " + series.key + "  " + series.value + "%";
              }
          }
      },

    title: {
        enable: true,
        text: 'Audit Statistics'
        },
           yDomain: [0,100]
};

$scope.graph1_data = [{
    key: "Inbound Audit",
    values: [
        { "label" : "Order Processing" , "value" : 32.00},
        { "label" : "Quality Assurance" , "value" : 46.00 },
        { "label" : "Shipping" , "value" : 54.00},
        { "label" : "Receiving" , "value" : 63.00},
        { "label" : "Order Filling" , "value" : 21.00 },
        ]
    },
    {
    key: "Cycle Count",
    values: [
        { "label" : "Order Processing" , "value" : 58.9},
        { "label" : "Quality Assurance" , "value" : 41.8 },
        { "label" : "Shipping" , "value" : 85.8},
        { "label" : "Receiving" , "value" : 21.8},
        { "label" : "Order Filling" , "value" : 49.3},
        ]
    },
    {
    key: "Oubound Audit",
    values: [
        { "label" : "Order Processing" , "value" : 12.00},
        { "label" : "Quality Assurance" , "value" :63.7 },
        { "label" : "Shipping" , "value" : 72.3},
        { "label" : "Receiving" , "value" : 92.4},
        { "label" : "Order Filling" , "value" : 13.7 },
        ]
    }
    ];

//Calculate average of Audit Graph to display in  Snapshot
var sum = 0; 
var cnt = 0;
for (var j = 0;j < $scope.graph1_data.length;j++) {
for (var i = 0; i < $scope.graph1_data[j].values.length;i++)
 {
    cnt+=1;
    sum+=parseInt($scope.graph1_data[j].values[i].value, 10);
 }
}
console.log(sum+"-"+cnt);
$scope.auditAvg=(sum/cnt).toFixed(2);
console.log($scope.auditAvg);




//*******************************************************************
//             SLOT GRAPH LOGIC
//******************************************************************* 



$scope.graph2_options = {
    chart: {
        type: 'lineChart',
        height: 450,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 200
        },

        x: function(d){ return d[0]; },
        y: function(d){ return d[1] },
        showValues: true,
        valueFormat: function(d){
           // return d3.format()(d);
          return d + "%"; 
     //   return d3.format(',.1f')(d);
        },
        duration: 500,
        xAxis: {
            axisLabel: 'Date',
            tickFormat: function(d) {
                        return d3.time.format('%m/%d/%y')(new Date(d))
                    }
        },
        yAxis: {
            axisLabel: 'Percentage of Slots Filled',
          //  "showMaxMin": true,
            "tickValues": [0,100], 
          //  axisLabelDistance: -10,
            tickFormat:d3.format(),
        },
        //yDomain is used to set max range for yAxis . similar for xAxis
     yDomain: [0,100],
     //below is used to generate a custom tooltip
    useInteractiveGuideline: false,
      tooltip: {
                contentGenerator: function (e) {
                    console.log(e);
                  var series = e.series[0];
                  var data=e.data.label;
                  if (series.value === null) return;
                  /**  var rows = 
                    "<tr>" +
                      "<td class='key'>" + 'Time: ' + "</td>" +
                      "<td class='x-value'>" + e.value + "</td>" + 
                    "</tr>" +
                    "<tr>" +
                      "<td class='key'>" + 'Voltage: ' + "</td>" +
                      "<td class='x-value'><strong>" + (series.value?series.value.toFixed(2):0) + "</strong></td>" +
                    "</tr>";**/

                  var header = 
                    "<thead>" + 
                      "<tr>" +
                        "<td class='legend-color-guide'><div style='background-color: " + series.color + ";'></div></td>" +
                        "<td class='key'><strong>" + data + "   -   " + series.value + "%" + "</strong></td>" +
                      "</tr>" + 
                    "</thead>";
                    
                  return "<table>" +
                      header  +
                      //"<tbody>" + 
                       // rows + 
                     // "</tbody>" +
                    "</table>";
              //    return series.color + "  " + series.key + "  " + series.value + "%";
              }
          }
      },

    title: {
        enable: true,
        text: 'Slot Statistics'
        },
           yDomain: [0,100]
};

 $scope.graph2_data = [
            {
                key: "Prime Slots",
               // mean: 250,
                values: [ [ 1476334800000 , 84] , [ 1476248400000 , 68] , [ 1476162000000 , 76] , [ 1476075600000 , 93] , [ 1475989200000 , 49] , 
                [ 1475902800000 , 62] , [ 1475816400000 , 51],[1475730000000,59],[1475643600000,78],[1475557200000,85]]
            },
            {
                key: "Reserve Slots",
              //  mean: -60,
                values: [ [ 1476334800000 , 45] , [ 1476248400000 , 56] , [ 1476162000000 , 62] , [ 1476075600000 , 34] , [ 1475989200000 , 78] , 
                [ 1475902800000 , 82] , [ 1475816400000 , 61],[1475730000000,59],[1475643600000,84],[1475557200000,22]]
            } 
        ];
        

//Calculate average of Audit Graph to display in  Snapshot
//var sum = 0; 
for (var i = 0; i < $scope.graph1_data[0].values.length;i++)
{
    sum+=parseInt($scope.graph1_data[0].values[i].value, 10);
}

//$scope.auditAvg=sum/$scope.graph1_data[0].values.length;
//console.log($scope.auditAvg);



}]);
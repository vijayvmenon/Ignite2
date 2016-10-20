angular.module('ignite2.managerDashboard')



.controller('manSlotCntrl', ['$scope','$http','$ionicPopup','manSlotSvc','localStorageService', '$stateParams', '$state', function($scope,$http,$ionicPopup,manSlotSvc,localStorageService,$stateParams,$state){
	

  $scope.manSlotSvc=manSlotSvc;

$scope.showSSTKfn=function() {
$scope.manSlotSvc.showsstk=true;
$scope.manSlotSvc.showpbyl=false;
$scope.manSlotSvc.showpick2put=false;
};

$scope.showPBYLfn=function() {
$scope.manSlotSvc.showsstk=false;
$scope.manSlotSvc.showpbyl=true;
$scope.manSlotSvc.showpick2put=false;
};

$scope.showPick2Putfn=function() {
$scope.manSlotSvc.showsstk=false;
$scope.manSlotSvc.showpbyl=false;
$scope.manSlotSvc.showpick2put=true;
};

$scope.slotgraphsstk_options = {
    chart: {
        type: 'pieChart',
      height: 500,
        margin : {
            top: 0,
            right: 0,
            bottom:0 ,
            left: 0
        },  
          "legend": {
      "margin": {
        "top": 5,
        "right": 20,
        "bottom": 5,
        "left": 0
      }
    },
        x: function(d){return d.label },
        y: function(d){ return d.value },
        showValues: true,
        showLabels:true,
         labelSunbeamLayout: true,
        valueFormat: function(d){
        },
        duration: 500,
     //below is used to generate a custom tooltip
    useInteractiveGuideline: false,
      tooltip: {
                contentGenerator: function (e) {
                  var series = e.series[0];
                  var data=e.data.label;
                  if (series.value === null) return;

                  var header = 
                    "<thead>" + 
                      "<tr>" +
                        "<td class='legend-color-guide'><div style='background-color: " + series.color + ";'></div></td>" +
                        "<td class='key'><strong>" + series.key+" : " + series.value + "</strong></td>" +
                      "</tr>" + 
                    "</thead>";
                    
                  return "<table>" +
                      header  +
                    "</table>";
              }
          }
      },

    title: {
        enable: true,
        text: 'Slot Statistics - SSTK'
        },
};


$scope.slotgraphpbyl_options = {
    chart: {
        type: 'pieChart',
      height: 500,
        margin : {
            top: 0,
            right: 0,
            bottom:0 ,
            left: 0
        },  
          "legend": {
      "margin": {
        "top": 5,
        "right": 20,
        "bottom": 5,
        "left": 0
      }
    },
        x: function(d){return d.label },
        y: function(d){ return d.value },
        showValues: true,
        showLabels:true,
         labelSunbeamLayout: true,
        valueFormat: function(d){
        },
        duration: 500,
     //below is used to generate a custom tooltip
    useInteractiveGuideline: false,
      tooltip: {
                contentGenerator: function (e) {
                               var series = e.series[0];
                  var data=e.data.label;
                  if (series.value === null) return;

                  var header = 
                    "<thead>" + 
                      "<tr>" +
                        "<td class='legend-color-guide'><div style='background-color: " + series.color + ";'></div></td>" +
                        "<td class='key'><strong>" + series.key+" : " + series.value + "</strong></td>" +
                      "</tr>" + 
                    "</thead>";
                    
                  return "<table>" +
                      header  +
                    "</table>";
              }
          }
      },

    title: {
        enable: true,
        text: 'Slot Statistics - PBYL'
        },
};


$scope.slotgraphpick2put_options = {
    chart: {
        type: 'pieChart',
      height: 500,
        margin : {
            top: 0,
            right: 0,
            bottom:0 ,
            left: 0
        },  
          "legend": {
      "margin": {
        "top": 5,
        "right": 20,
        "bottom": 5,
        "left": 0
      }
    },
        x: function(d){return d.label },
        y: function(d){ return d.value },
        showValues: true,
        showLabels:true,
         labelSunbeamLayout: true,
        valueFormat: function(d){
        },
        duration: 500,
     //below is used to generate a custom tooltip
    useInteractiveGuideline: false,
      tooltip: {
                contentGenerator: function (e) {
                             var series = e.series[0];
                  var data=e.data.label;
                  if (series.value === null) return;

                  var header = 
                    "<thead>" + 
                      "<tr>" +
                        "<td class='legend-color-guide'><div style='background-color: " + series.color + ";'></div></td>" +
                        "<td class='key'><strong>" + series.key+" : " + series.value + "</strong></td>" +
                      "</tr>" + 
                    "</thead>";
                    
                  return "<table>" +
                      header  +
                    "</table>";
              }
          }
      },

    title: {
        enable: true,
        text: 'Slot Statistics - PICK2PUT'
        },
};

$scope.slotgraphsstk_data = [  
        { "label" : "Empty" , "value" : 1200.00},
        { "label" : "Held" , "value" : 600.00 },
        { "label" : "Audited" , "value" : 200.00},
        { "label" : "Not Rotated" , "value" : 100.00},     
        ];

$scope.slotgraphpbyl_data = [
        { "label" : "Empty" , "value" : 50.00},
        { "label" : "Held" , "value" : 100.00 },
        { "label" : "Audited" , "value" : 240.00},
        { "label" : "Not Rotated" , "value" : 80.00},     
        ];

 $scope.slotgraphpick2put_data = [
        { "label" : "Empty" , "value" : 460.00},
        { "label" : "Held" , "value" : 60.00 },
        { "label" : "Audited" , "value" : 120.00},
        { "label" : "Not Rotated" , "value" : 50.00},     
        ];

}])


.factory('manSlotSvc', function(){
  return {
  showsstk:true,
    showpbyl:false,
    showpick2put:false
  }
});
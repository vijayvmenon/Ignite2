angular.module('ignite2.managerDashboard')

.controller('manPalletMvmtCntrl', ['$scope','$http','$filter','$ionicPopup','localStorageService', 'manProdSvc','$stateParams', '$state', function($scope,$http,$filter,$ionicPopup,localStorageService,manProdSvc,$stateParams,$state){

$scope.palletmvmtgraph_options = {
    chart: {
         type: 'stackedAreaChart',
                height: 400,
                width:500,
                margin : {
                    top: 20,
                    right: 0,
                    bottom: 20,
                    left: 40
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];},
               useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline:true,
                xAxis: {
                    showMaxMin: false,
                  //  axisLabel:'Date',
                  tickFormat:function(d) {
                    return d3.time.format('%b-%d %I:00%p')(new Date(d))
                  }           
                },
                yAxis: {
                   // showMaxMin: true,
                //  axisLabel:'No of Moves',
                   tickFormat:function(d) {
                      return d3.format(',.f')(d)
                   },
          "interactiveLayer": {
      "dispatch": {},
      "tooltip": {
        "duration": 0,
        "gravity": "s",
        "distance": 0,
        "snapDistance": 0,
        "classes": null,
        "chartContainer":"#manpalletgraph",
        "enabled": true,
        "hideDelay": 0,
        "headerEnabled": true,
        "fixedTop": null,
        "offset": {
          "left": 0,
          "top": 0
        },
        "hidden": false,
        "data": null,
        "id": "nvtooltip-52692"
      },
      "margin": {
        "left": 40,
        "top": 30
      },
      "width": null,
      "height": null,
      "showGuideLine": true,
      "svgContainer": null
    },    
 },
                      
                zoom: {
                    enabled: true,
                    scaleExtent: [1,10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            },

    title: {
        enable: true,
        text: 'Pallet Movement Statistics'
        },
};

//Get current time and past 24 hours time

//Function to get the time in format MM/DD HH:00 AM/PM
$scope.formatAMPM = function (date) {
  var hours = date.getHours();
  var day=date.getDate();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var month = monthNames[date.getMonth()];
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
 // mmdd=date.toISOString().slice(5,10).replace(/-/g,"/")
  var strTime = day + "-" + month + " " + hours + ampm;
  return strTime;
}

var h1 = new Date().getTime() - (24 * 60 * 60 * 1000);
var h2 = new Date().getTime() - (23 * 60 * 60 * 1000);
var h3 = new Date().getTime() - (22 * 60 * 60 * 1000);
var h4 = new Date().getTime() - (21 * 60 * 60 * 1000);
var h5 = new Date().getTime() - (20 * 60 * 60 * 1000);
var h6 = new Date().getTime() - (19 * 60 * 60 * 1000);
var h7 = new Date().getTime() - (18 * 60 * 60 * 1000);
var h8 = new Date().getTime() - (17 * 60 * 60 * 1000);
var h9 = new Date().getTime() - (16 * 60 * 60 * 1000);
var h10 =new Date().getTime() - (15 * 60 * 60 * 1000);
var h11 =new Date().getTime() - (14 * 60 * 60 * 1000);
var h12 =new Date().getTime() - (13 * 60 * 60 * 1000);
var h13 =new Date().getTime() - (12 * 60 * 60 * 1000);
var h14 =new Date().getTime() - (11 * 60 * 60 * 1000);
var h15 =new Date().getTime() - (10 * 60 * 60 * 1000);
var h16 =new Date().getTime() - (9 * 60 * 60 * 1000);
var h17 =new Date().getTime() - (8 * 60 * 60 * 1000);
var h18 =new Date().getTime() - (7 * 60 * 60 * 1000);
var h19 =new Date().getTime() - (6 * 60 * 60 * 1000);
var h20 =new Date().getTime() - (5 * 60 * 60 * 1000);
var h21 =new Date().getTime() - (4 * 60 * 60 * 1000);
var h22 =new Date().getTime() - (3 * 60 * 60 * 1000);
var h23 =new Date().getTime() - (2 * 60 * 60 * 1000);
var h24 =new Date().getTime() - (1 * 60 * 60 * 1000);
var h25 =new Date().getTime() - (60 * 60 * 1000);

/**
var h = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
var h1=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (23 * 60 * 60 * 1000));
var h2=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (22 * 60 * 60 * 1000));
var h3=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (21 * 60 * 60 * 1000));
var h4=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (20 * 60 * 60 * 1000));
var h5=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (19 * 60 * 60 * 1000));
var h6=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (18 * 60 * 60 * 1000));
var h7=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (17 * 60 * 60 * 1000));
var h8=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (16 * 60 * 60 * 1000));
var h9=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (15 * 60 * 60 * 1000));
var h10=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (14 * 60 * 60 * 1000));
var h11=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (13 * 60 * 60 * 1000));
var h12=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (12 * 60 * 60 * 1000));
var h13=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (11 * 60 * 60 * 1000));
var h14=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (10 * 60 * 60 * 1000));
var h15=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (9 * 60 * 60 * 1000));
var h16=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (8 * 60 * 60 * 1000));
var h17=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (7 * 60 * 60 * 1000));
var h18=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (6 * 60 * 60 * 1000));
var h19=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (5 * 60 * 60 * 1000));
var h20=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (4 * 60 * 60 * 1000));
var h21=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (3 * 60 * 60 * 1000));
var h22=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (2 * 60 * 60 * 1000));
var h23=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (1 * 60 * 60 * 1000));
var h24=$scope.formatAMPM(h);
var h = new Date(new Date().getTime() - (60 * 60 * 1000));
var h25=$scope.formatAMPM(h);

**/
console.log(h1,h2,h3,h4,h5,h6,h7,h8,h9,h10,h11,h12,h13,h14,h15,h16,h17,h18,h19,h20,h21,h22,h23,h24,h25);

 $scope.palletmvmtgraph_data = [
            {
                "key": "Planned Moves",
                "values": [ [h1,84.00],[ h2,68.00],[h3,76.00],[h4,93.00],[h5,49.00],[ h6,62.00],[ h7,51.00],[h8,59.00],[h9,78.00],[h10,45.00],
                [h11,34.00],[h12,84.00],[h13,68.00],[h14,76.00],[h15,93.00],[h16,49.00],[h17,62.00],[h18,51.00],[h19,59.00],[h20,78.00],
               [h21,45.00],[h22,34.00],[h23,85.00],[h24,21.00],[h25,67.00] ]
            },
            {
                "key": "Completed Moves",
                "values": [ [h1,45.00],[ h2,34.00],[h3,23.00],[h4,67.00],[h5,25.00],[ h6,48.00],[ h7,32.00],[h8,45.00],[h9,62.00],[h10,30.00],
                [h11,21.00],[h12,68.00],[h13,53.00],[h14,44.00],[h15,77.00],[h16,35.00],[h17,51.00],[h18,43.00],[h19,41.00],[h20,61.00],
               [h21,32.00],[h22,19.00],[h23,67.00],[h24,9.00],[h25,51.00] ]
            },  
            {
                "key": "Pending Moves",
                "values": [ [h1,6.00],[h2,25.00],[h3,13.00],[h4,14.00],[h5,29.00],[ h6,33.00],[ h7,27.00],[h8,36.00],[h9,59.00],[h10,19.00],
                [h11,43.00],[h12,49.00],[h13,56.00],[h14,28.00],[h15,81.00],[h16,42.00],[h17,26.00],[h18,33.00],[h19,55.00],[h20,71.00],[h21,35.00],
               [h22,22.00],[h23,45.00],[h24,52.00],[h25,45.00] ]
            },
            {
               "key": "Working Moves",
                "values": [ [h1,17.00],[ h2,23.00],[h3,34.00],[h4,43.00],[h5,24.00],[h6,61.00],[ h7,41.00],[h8,37.00],[h9,46.00],[h10,56.00],
                [h11,30.00],[h12,40.00],[h13,50.00],[h14,60.00],[h15,20.00],[h16,3.00],[h17,5.00],[h18,60.00],[h19,55.00],[h20,70.00],[h21,40.00],
              [h22,39.00],[h23,54.00],[h24,87.00],[h25,35.00] ]
            } 
        ];

console.log($scope.palletmvmtgraph_data);

        //Below Logic is to add a new object to the prodgraphdaily_data array with the total inventory which is received - shipped cases
   /**     
          var  recv=[];
          var dt=[];
        for (var i=0;i<$scope.prodgraphdaily_data[0].values.length;i++) {
        	//console.log($scope.prodgraphdaily_data[0].values[i]);
             recv.push($scope.prodgraphdaily_data[0].values[i][1]);
             dt.push($scope.prodgraphdaily_data[0].values[i][0])
        }

        var shp=[];
        for (var i=0;i<$scope.prodgraphdaily_data[1].values.length;i++) {
             shp.push($scope.prodgraphdaily_data[1].values[i][1]);
        }
            
        //    console.log(recv,shp,dt);
        var tot=[];

         for (var j = 0;j<$scope.prodgraphdaily_data[1].values.length;j++) {
             var val=recv[j] - shp[j];
             tot.push([dt[j],val]);
         }
         
         $scope.prodgraphdaily_data.push({key:"Total Inventory",values:tot})
        // console.log($scope.prodgraphdaily_data);
      console.log($scope.prodgraphdaily_data);

**/
}])




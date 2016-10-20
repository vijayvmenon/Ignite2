angular.module('ignite2.managerDashboard')

.controller('manProductivityCntrl', ['$scope','$http','$filter','$ionicPopup','localStorageService', 'manProdSvc','$stateParams', '$state', function($scope,$http,$filter,$ionicPopup,localStorageService,manProdSvc,$stateParams,$state){
	
   // $scope.maxValue   = 100;
    //$scope.auditAvg = 67;
  //  $scope.loadingCurrent1 = {
    //backgroundColor: "#33cc33"
//}

//$scope.callback = function(){ $scope.api.clearElement(); $scope.updateWithTimeout(0); };

//Below Logic is to show the Daily, MWeekly, Monthly Graphs based on click of Button
$scope.manProdSvc=manProdSvc;

$scope.showDailyfn=function() {
$scope.manProdSvc.showDaily=true;
$scope.manProdSvc.showWeekly=false;
$scope.manProdSvc.showMonthly=false;
};

$scope.showWeeklyfn=function() {
$scope.manProdSvc.showDaily=false;
$scope.manProdSvc.showWeekly=true;
$scope.manProdSvc.showMonthly=false;
};

$scope.showMonthlyfn=function() {
$scope.manProdSvc.showDaily=false;
$scope.manProdSvc.showWeekly=false;
$scope.manProdSvc.showMonthly=true;
};

//End of Logic above


$scope.prodgraphdaily_options = {
    chart: {
        type: 'multiBarChart',
        height: 500,
       margin : {
            top: 20,
            right: 20,
            bottom: 80,
            left:100
        },

        x: function(d){ return d[0]; },
        y: function(d){ return d[1] },
        showValues: true,
        valueFormat: function(d){
           // return d3.format()(d);
         // return d + "%"; 
       return d3.format(',.1f')(d);
        },
        duration: 500,
        xAxis: {
            axisLabel: 'Date',
            tickPadding:0,
            rotateLabels: -45,
            tickFormat: function(d) {
                        return d3.time.format('%m/%d/%y')(new Date(d))
                   }

       //   tickValues: function(d){return d[0]}

       //      tickValues:ideas.values.map( function(d){return d.x;} ) );       
        },
        reduceXTicks: false,
        yAxis: {
            axisLabel: 'Number of Cases',
          //  "showMaxMin": true,
         //   "tickValues": [], 
          //  axisLabelDistance: -10,
       tickFormat:d3.format()   
        },
        //yDomain is used to set max range for yAxis . similar for xAxis
   //  yDomain: [0,100],
     //below is used to generate a custom tooltip
    useInteractiveGuideline: false,
      tooltip: {
                contentGenerator: function (e) {
                  //  console.log(e);
                  var series = e.series[0];
                  var date=e.data[0];
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
                        "<td class='key'><strong>" + series.key + "   -   " + series.value + "</strong></td>" +
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
        text: 'DC Productivity'
        },
};

//Get current day and past 10 days

var dat=new Date();
var oneday=24*60*60*1000;
dat1=dat.getTime() - (oneday);
dat2=dat.getTime() - (oneday*2);
dat3=dat.getTime() - (oneday*3);
dat4=dat.getTime() - (oneday*4);
dat5=dat.getTime() - (oneday*5);
dat6=dat.getTime() - (oneday*6);
dat7=dat.getTime() - (oneday*7);
dat8=dat.getTime() - (oneday*8);
dat9=dat.getTime() - (oneday*9);



 $scope.prodgraphdaily_data = [
            {
                key: "Received Cases",
               // mean: 250,
                values: [ [ dat9 , 84] , [ dat8 , 68] , [ dat7 , 76], [ dat6, 93] , [ dat5, 49],[ dat4 , 62] , [ dat3, 51],[dat2,59],[dat1,78],
               [dat,85]]
            },
            {
                key: "Shipped Cases",
              //  mean: -60,
               values: [ [ dat9, 45] , [ dat8, 22] , [ dat7, 45], [ dat6 , 67] , [ dat5 , 34],[ dat4 , 38] , [ dat3, 21],[dat2,34],[dat1,63],
               [dat,50]]
            },  

        ];

//console.log($scope.prodgraphdaily_data);

        //Below Logic is to add a new object to the prodgraphdaily_data array with the total inventory which is received - shipped cases
        
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
     // console.log($scope.prodgraphdaily_data);


//*******************************************************************************
//                WEEKLY LOGIC
//*******************************************************************************

//Below function gets the first and last day of the week in mm/DD format. The data is passed as input to the function

$scope.getWeekFirstLast = function(dt) {
var firstday = new Date(dt.setDate(dt.getDate() - dt.getDay())).toISOString().slice(5,10).replace(/-/g,"/");
var lastday = new Date(dt.setDate(dt.getDate() - dt.getDay()+6)).toISOString().slice(5,10).replace(/-/g,"/");
//console.log(firstday+"/"+lastday);
return firstday+" - "+lastday;
};

var d1=new Date();
var w1=$scope.getWeekFirstLast(d1);
var d2=new Date().setDate(new Date().getDate() - 7);
var x = new Date(d2);
var w2=$scope.getWeekFirstLast(x);
 var dt3=new Date().setDate(new Date().getDate() - 14);
  x = new Date(dt3);
 var w3=$scope.getWeekFirstLast(x);
 var d4=new Date().setDate(new Date().getDate() - 21);
  x = new Date(d4);
 var w4=$scope.getWeekFirstLast(x);
 var d5=new Date().setDate(new Date().getDate() - 28);
   x = new Date(d5);
 var w5=$scope.getWeekFirstLast(x);
 var d6=new Date().setDate(new Date().getDate() - 35);
   x = new Date(d6);
 var w6=$scope.getWeekFirstLast(x);
 var d7=new Date().setDate(new Date().getDate() - 42);
  x = new Date(d7);
 var w7=$scope.getWeekFirstLast(x);
 var d8=new Date().setDate(new Date().getDate() - 49);
  x = new Date(d8);
 var w8=$scope.getWeekFirstLast(x);
 var d9=new Date().setDate(new Date().getDate() - 56);
  x = new Date(d9);
 var w9=$scope.getWeekFirstLast(x);
 var d10=new Date().setDate(new Date().getDate() - 63);
   x = new Date(d10);
 var w10=$scope.getWeekFirstLast(x);


$scope.prodgraphweekly_options = {
    chart: {
        type: 'multiBarChart',
        height: 500,
       margin : {
            top: 20,
            right: 20,
            bottom: 80,
            left:100
        },

        x: function(d){ return d[0]; },
        y: function(d){ return d[1] },
        showValues: true,
        valueFormat: function(d){
           // return d3.format()(d);
         // return d + "%"; 
       return d3.format(',.1f')(d);
        },
        duration: 500,
        xAxis: {
            axisLabel: 'Date',
            tickPadding:0,
            rotateLabels: -45,
         //   tickFormat: d3.format()
        },
        reduceXTicks: false,
        yAxis: {
            axisLabel: 'Number of Cases',
       tickFormat:d3.format()   
        },
    useInteractiveGuideline: false,
      tooltip: {
                contentGenerator: function (e) {
                  //  console.log(e);
                  var series = e.series[0];
                  var date=e.data[0];
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
                        "<td class='key'><strong>" + series.key + "   -   " + series.value + "</strong></td>" +
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
        text: 'DC Productivity'
        },
};

$scope.prodgraphweekly_data = [
            {
                key: "Received Cases",
               // mean: 250,
                values: [ [ w10 , 160] , [ w9 , 275] , [ w8 , 383], [ w7, 172] , [ w6, 478],[ w5, 255] , [ w4 , 561],[w3,282],[w2,78],
               [w1,345]]
            },
            {
                key: "Shipped Cases",
              //  mean: -60,
               values: [ [ w10, 125] , [ w9, 130] , [ w8, 210], [ w7, 110] , [ w6 , 210],[ w5 , 120] , [ w4, 250],[w3,130],[w2,23],
               [w1,150]]
            },  

        ];


        //Below Logic is to add a new object to the prodgraphweekly_data array with the total inventory which is received - shipped cases
        
          var  recvw=[];
          var dtw=[];
        for (var i=0;i<$scope.prodgraphweekly_data[0].values.length;i++) {
        	//console.log($scope.prodgraphdaily_data[0].values[i]);
             recvw.push($scope.prodgraphweekly_data[0].values[i][1]);
             dtw.push($scope.prodgraphweekly_data[0].values[i][0])
        }

        var shpw=[];
        for (var i=0;i<$scope.prodgraphweekly_data[1].values.length;i++) {
             shpw.push($scope.prodgraphweekly_data[1].values[i][1]);
        }
            
        var totw=[];

         for (var j = 0;j<$scope.prodgraphweekly_data[1].values.length;j++) {
             var val=recvw[j] - shpw[j];
             totw.push([dtw[j],val]);
         }
         
         $scope.prodgraphweekly_data.push({key:"Total Inventory",values:totw})
      //console.log($scope.prodgraphweekly_data);

//console.log($filter('date')(d,'w'));

//*****************************************************************************************************
//                            MONTHLY PRODUCTIVITY GRAPH
//*****************************************************************************************************

//Logic to get the past 12 months with year

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var mdat=new Date();
var m1=monthNames[new Date(mdat.getFullYear(), mdat.getMonth(), 1).getMonth()];
var y1=new Date(mdat.getFullYear(), mdat.getMonth(), 1).getFullYear();
var my1=m1+"-"+y1;
var m2=monthNames[new Date(mdat.getFullYear(), mdat.getMonth() - 1, 1).getMonth()];
var y2=new Date(mdat.getFullYear(), mdat.getMonth() - 1, 1).getFullYear();
var my2=m2+"-"+y2;
var m3=monthNames[new Date(mdat.getFullYear(), mdat.getMonth() - 2, 1).getMonth()];
var y3=new Date(mdat.getFullYear(), mdat.getMonth() - 2, 1).getFullYear();
var my3=m3+"-"+y3;
var m4=monthNames[new Date(mdat.getFullYear(), mdat.getMonth() - 3, 1).getMonth()];
var y4=new Date(mdat.getFullYear(), mdat.getMonth() - 3, 1).getFullYear();
var my4=m4+"-"+y4;
var m5=monthNames[new Date(mdat.getFullYear(), mdat.getMonth()- 4, 1).getMonth()];
var y5=new Date(mdat.getFullYear(), mdat.getMonth() - 4, 1).getFullYear();
var my5=m5+"-"+y5;
var m6=monthNames[new Date(mdat.getFullYear(), mdat.getMonth() - 5, 1).getMonth()];
var y6=new Date(mdat.getFullYear(), mdat.getMonth() - 5, 1).getFullYear();
var my6=m6+"-"+y6;
var m7=monthNames[new Date(mdat.getFullYear(), mdat.getMonth() - 6, 1).getMonth()];
var y7=new Date(mdat.getFullYear(), mdat.getMonth() - 6, 1).getFullYear();
var my7=m7+"-"+y7;
var m8=monthNames[new Date(mdat.getFullYear(), mdat.getMonth() - 7, 1).getMonth()];
var y8=new Date(mdat.getFullYear(), mdat.getMonth() - 7, 1).getFullYear();
var my8=m8+"-"+y8;
var m9=monthNames[new Date(mdat.getFullYear(), mdat.getMonth() - 8, 1).getMonth()];
var y9=new Date(mdat.getFullYear(), mdat.getMonth() - 8, 1).getFullYear();
var my9=m9+"-"+y9;
var m10=monthNames[new Date(mdat.getFullYear(), mdat.getMonth() - 9, 1).getMonth()];
var y10=new Date(mdat.getFullYear(), mdat.getMonth() - 9, 1).getFullYear();
var my10=m10+"-"+y10;
var m11=monthNames[new Date(mdat.getFullYear(), mdat.getMonth() - 10, 1).getMonth()];
var y11=new Date(mdat.getFullYear(), mdat.getMonth() - 10, 1).getFullYear();
var my11=m11+"-"+y11;
var m12=monthNames[new Date(mdat.getFullYear(), mdat.getMonth() - 11, 1).getMonth()];
var y12=new Date(mdat.getFullYear(), mdat.getMonth() - 11, 1).getFullYear();
var my12=m12+"-"+y12;
//console.log(my1,my2,my3,my4,my5,my6,my7,my8,my9,my10,my11,my12);




$scope.prodgraphmonthly_options = {
    chart: {
        type: 'multiBarChart',
        height: 500,
       margin : {
            top: 20,
            right: 20,
            bottom: 80,
            left:100
        },

        x: function(d){ return d[0]; },
        y: function(d){ return d[1] },
        showValues: true,
        valueFormat: function(d){
           // return d3.format()(d);
         // return d + "%"; 
       return d3.format(',.1f')(d);
        },
        duration: 500,
        xAxis: {
            axisLabel: 'Date',
            tickPadding:0,
            rotateLabels: -45,
           //tickFormat: function(d) {
           	//console.log(d);
           //}
       },
        reduceXTicks: false,
        yAxis: {
            axisLabel: 'Number of Cases',
       tickFormat:d3.format()   
        },
    useInteractiveGuideline: false,
      tooltip: {
                contentGenerator: function (e) {
                  //  console.log(e);
                  var series = e.series[0];
                  var date=e.data[0];
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
                        "<td class='key'><strong>" + series.key + "   -   " + series.value + "</strong></td>" +
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
        text: 'DC Productivity'
        },
};

$scope.prodgraphmonthly_data = [
            {
                key: "Received Cases",
               // mean: 250,
                values: [ [ my12 , 1600] , [ my11 , 2750] , [ my10 , 3830], [ my9, 1720] , [ my8, 4780],[ my7, 2550] , [ my6 , 5610],[my5,2820],
                [my4,780],[my3,3450],[my2,4560],[my1,6720] ]
            },
            {
                key: "Shipped Cases",
              //  mean: -60,
                  values: [ [ my12 , 1200] , [ my11 , 2340] , [ my10 , 2500], [ my9, 900] , [ my8, 3400],[ my7, 1230] , [ my6 , 4570],
                  [my5,1300],[my4,600],[my3,3400],[my2,4200],[my1,5600] ]
            },  

        ];


        //Below Logic is to add a new object to the prodgraphweekly_data array with the total inventory which is received - shipped cases
        
          var  recvm=[];
          var dtm=[];
        for (var i=0;i<$scope.prodgraphmonthly_data[0].values.length;i++) {
        	//console.log($scope.prodgraphdaily_data[0].values[i]);
             recvm.push($scope.prodgraphmonthly_data[0].values[i][1]);
             dtm.push($scope.prodgraphmonthly_data[0].values[i][0])
        }

        var shpm=[];
        for (var i=0;i<$scope.prodgraphmonthly_data[1].values.length;i++) {
             shpm.push($scope.prodgraphmonthly_data[1].values[i][1]);
        }
            
        var totm=[];

         for (var j = 0;j<$scope.prodgraphmonthly_data[1].values.length;j++) {
             var val=recvm[j] - shpm[j];
             totm.push([dtm[j],val]);
         }
         
         $scope.prodgraphmonthly_data.push({key:"Total Inventory",values:totm})
    //  console.log($scope.prodgraphmonthly_data);

//console.log($filter('date')(d,'w'));

}])


//The service below is used to Intialize the showDaily variable
// to true so that when the page is loaded, the daily productivity is shown by default

.factory('manProdSvc', function(){
	return {
	showDaily:true,
    showWeekly:false,
    showMonthly:false
	}
});
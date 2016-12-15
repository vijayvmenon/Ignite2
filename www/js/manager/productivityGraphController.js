angular.module('ignite2.managerDashboard')

.controller('manProductivityCntrl', ['$scope','$http','$ionicPush','$timeout','$filter','$ionicPopup','localStorageService', 'manProdSvc','$stateParams', '$state','_', function($scope,$http,$ionicPush,$timeout,$filter,$ionicPopup,localStorageService,manProdSvc,$stateParams,$state,_){
	


  $ionicPush.register().then(function(t) {
  return $ionicPush.saveToken(t);
}).then(function(t) {
  console.log('Token saved:', t.token);
});



//Get the Time and Date to display at the top Bar in Manager Dashboard



$scope.today = new Date();
     $scope.tickInterval = 1000 //ms

     var tick = function() {
        $scope.clock = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
      }

    // Start the timer
    $timeout(tick, $scope.tickInterval);


//Function to generate Random number between min and max
var getRandomInt=function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


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


//*******************************************************************************
//                    DAILY LOGIC
//*******************************************************************************

//Get current day and past 10 days

var dat=new Date().getTime();
var oneday=24*60*60*1000;
dat1=dat - (oneday);
dat2=dat - (oneday*2);
dat3=dat - (oneday*3);
dat4=dat - (oneday*4);
dat5=dat - (oneday*5);
dat6=dat - (oneday*6);
dat7=dat - (oneday*7);
dat8=dat - (oneday*8);
dat9=dat - (oneday*9);


$scope.prodgraphdaily_data=[];
$scope.prodgraphdaily_data = [
{
  key: "Received Cases",
               // mean: 250,
               values: [ {"date":dat9,"value":getRandomInt(500,800)},{"date":dat8,"value":getRandomInt(500,800)},{"date":dat7,"value":getRandomInt(500,800)},
               {"date":dat6,"value":getRandomInt(500,800)},{"date":dat5,"value":getRandomInt(500,800)},{"date":dat4,"value":getRandomInt(500,800)},
               {"date":dat3,"value":getRandomInt(500,800)},{"date":dat2,"value":getRandomInt(500,800)},
               {"date":dat1,"value":getRandomInt(500,800)},{"date":dat,"value":getRandomInt(500,800)} ]
             },
             {
              key: "Shipped Cases",
              //  mean: -60,
              values: [ {"date":dat9,"value":getRandomInt(500,800)},{"date":dat8,"value":getRandomInt(500,800)},{"date":dat7,"value":getRandomInt(500,800)},
              {"date":dat6,"value":getRandomInt(500,800)},{"date":dat5,"value":getRandomInt(500,800)},{"date":dat4,"value":getRandomInt(500,800)},
              {"date":dat3,"value":getRandomInt(500,800)},{"date":dat2,"value":getRandomInt(500,800)},
              {"date":dat1,"value":getRandomInt(500,800)},{"date":dat,"value":getRandomInt(500,800)} ]
            },
            {
              key: "Total Inventory",
              //  mean: -60,
              values: [ {"date":dat9,"value":getRandomInt(2500,4000)},{"date":dat8,"value":getRandomInt(2500,4000)},
              {"date":dat7,"value":getRandomInt(2500,4000)},{"date":dat6,"value":getRandomInt(2500,4000)},
              {"date":dat5,"value":getRandomInt(2500,4000)},{"date":dat4,"value":getRandomInt(2500,4000)},
              {"date":dat3,"value":getRandomInt(2500,4000)},{"date":dat2,"value":getRandomInt(2500,4000)},
              {"date":dat1,"value":getRandomInt(2500,4000)},{"date":dat,"value":getRandomInt(2500,4000)} ]
            }

            ];

            console.log($scope.prodgraphdaily_data);

            $scope.prodgraphdaily_options = {
              chart: {
                type: 'lineChart',
                height: 370,
                margin : {
                  top: 20,
                  right: 20,
                  bottom: 50,
                  left:100
                },

                x: function(d){ return d.date},
                y: function(d){ return d.value },
                color: d3.scale.category10().range(),
                duration: 300,
                useInteractiveGuideline: true,
                clipVoronoi: false,
                xAxis: {
                 axisLabel: 'Date',
                 rotateLabels: -45,
                 tickFormat: function(d) {
                  return d3.time.format('%m/%d/%y')(new Date(d))
                },
 //        tickValues: function(values) {
   //   return _.map(values[0].values, function(v) {
     // return new Date(v.date);
      //})
      //},
      showMaxMin: false,
      staggerLabels: true
    },
    reduceXTicks: false,
    yAxis: {
      axisLabel: 'Number of Cases',
      tickFormat: function(d){
       return d3.format(',.f')(d)
           // console.log(d)
         },
         axisLabelDistance: 20
       }
        //yDomain is used to set max range for yAxis . similar for xAxis
   //  yDomain: [0,100],
     //below is used to generate a custom tooltip
   /** 
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
                    "</tr>";

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
          **/
        },

        title: {
          enable: true,
          text: 'DC PRODUCTIVITY - DAILY',
          css: {
            'text-align': 'left',
            'margin': '10px 13px 0px 7px',
            'font-size':'16px',
            'color':'#29B4B6',
            'font-width':'bold',
            'font-family':'segoe ui'
          }

        },
      };



//******************************************************************************
//                   Mobile daily graph
//******************************************************************************
$scope.prodgraphdailymob_options = {
  chart: {
    type: 'lineChart',
    height: 370,
    margin : {
      top: 20,
      right: 20,
      bottom: 40,
      left:35
    },

    x: function(d){ return d.date},
    y: function(d){ return d.value },
    color: d3.scale.category10().range(),
    duration: 300,
    useInteractiveGuideline: true,
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
    tickFormat: function(d){
     return d3.format(',.f')(d)
           // console.log(d)
         },
         axisLabelDistance: 20
       }
     },

     title: {
      enable: true,
      text: 'DC PRODUCTIVITY - DAILY',
      css: {
            'text-align': 'left',
            'margin': '10px 13px 0px 7px',
            'font-size':'16px',
            'color':'#29B4B6',
            'font-width':'bold',
            'font-family':'segoe ui'
        }
    },
  };



//Generate the array for Daily Data
var dat=new Date().getTime();
var recvcases=[];
var shipcases=[];
var totinv=[];

for (var h=1;h<241;h++) {
 this["dat"+h] = dat - (60*60*1000*h);
 recvd=getRandomInt(100,500);
 shpd=getRandomInt(100,500);
 tot=getRandomInt(1000,5000);
 recvcases.push({"date":this["dat"+h],"value":recvd});
 shipcases.push({"date":this["dat"+h],"value":shpd});
 totinv.push({"date":this["dat"+h],"value":tot});
}

//Below slice is to get the first 24 records from the array to generate the rate of receiving and shipping in mobile screen snapshot
recvcasessnaptoday=recvcases.slice(0,12);
recvcasessnapyest=recvcases.slice(12,24);
shipcasessnaptoday=shipcases.slice(0,12);
shipcasessnapyest=shipcases.slice(12,24);
recvtoday=0;
recvyest=0;
shptoday=0;
shpyest=0;



for (var t=0;t<recvcasessnaptoday.length;t++) {
 recvtoday+=recvcasessnaptoday[t].value;
};

for (var s=0;s<recvcasessnapyest.length;s++) {
 recvyest+=recvcasessnapyest[s].value;
}

for (var d=0;d<shipcasessnaptoday.length;d++) {
 shptoday+=shipcasessnaptoday[d].value;
}

for (var f=0;f<shipcasessnapyest.length;f++) {
 shpyest+=shipcasessnapyest[f].value;
}

//console.log(recvtoday+" "+recvyest+" "+shptoday+" "+shpyest);
//End of mobile snapshot logic - the variables recvtoday recvyest shptoday shpyest will be used in mobile snapshot logic below

recvcasesact=recvcases.reverse();
shipcasesact=shipcases.reverse();
totinvact=totinv.reverse();

$scope.prodgraphdailymob_data = [
{
  key: "Received Cases",
  values: recvcasesact
},
{
  key: "Shipped Cases",
  values: shipcasesact
},
{
  key: "Total Inventory",
  values: totinvact
}        
];

//console.log($scope.prodgraphdaily_data);


        //Below Logic is to add a new object to the prodgraphdaily_data array with the total inventory which is received - shipped cases
/**
          var  recv=[];
          var dt=[];
        for (var i=0;i<$scope.prodgraphdaily_data[0].values.length;i++) {
             recv.push($scope.prodgraphdaily_data[0].values[i].value);
             dt.push($scope.prodgraphdaily_data[0].values[i].date)
        }

        var shp=[];
        for (var i=0;i<$scope.prodgraphdaily_data[1].values.length;i++) {
             shp.push($scope.prodgraphdaily_data[1].values[i].value);
        }
            
        //    console.log(recv,shp,dt);
        var tot=[];

         for (var j = 0;j<$scope.prodgraphdaily_data[1].values.length;j++) {
             var val=recv[j] - shp[j];
             tot.push({"date":dt[j],"value":val});
         }
         
         $scope.prodgraphdaily_data.push({key:"Total Inventory",values:tot})
         console.log($scope.prodgraphdaily_data);
         **/

//*******************************************************************************
//                WEEKLY LOGIC
//*******************************************************************************

//Below function gets the first and last day of the week in mm/DD format. The data is passed as input to the function

$scope.getWeekFirstLast = function(dt) {
  var lastday = new Date(dt.setDate(dt.getDate() - dt.getDay()+6)).getTime();
  return lastday;
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

$scope.prodgraphweekly_data = [
{
  key: "Received Cases",
  values: [ {"label":w10 ,"value":getRandomInt(4000,6000)},{"label":w9,"value":getRandomInt(4000,6000)},
  {"label":w8,"value":getRandomInt(4000,6000)},{"label":w7,"value":getRandomInt(4000,6000)},
  {"label":w6,"value":getRandomInt(4000,6000)},{"label":w5,"value":getRandomInt(4000,6000)},{ "label":w4,"value":getRandomInt(4000,6000)},
  {"label":w3,"value":getRandomInt(4000,6000)},{"label":w2,"value":getRandomInt(4000,6000)},
  {"label":w1,"value":getRandomInt(4000,6000)} ]
},
{
  key: "Shipped Cases",
  values: [ {"label":w10 ,"value":getRandomInt(4000,6000)},{"label":w9,"value":getRandomInt(4000,6000)},
  {"label":w8,"value":getRandomInt(4000,6000)},{"label":w7,"value":getRandomInt(4000,6000)},
  {"label":w6,"value":getRandomInt(4000,6000)},{"label":w5,"value":getRandomInt(4000,6000)},{ "label":w4,"value":getRandomInt(4000,6000)},
  {"label":w3,"value":getRandomInt(4000,6000)},{"label":w2,"value":getRandomInt(4000,6000)},
  {"label":w1,"value":getRandomInt(4000,6000)} ]
},
{
  key: "Total Inventory",
  values: [ {"label":w10 ,"value":getRandomInt(10000,15000)},{"label":w9,"value":getRandomInt(10000,15000)},
  {"label":w8,"value":getRandomInt(10000,15000)},{"label":w7,"value":getRandomInt(10000,15000)},
  {"label":w6,"value":getRandomInt(10000,15000)},{"label":w5,"value":getRandomInt(10000,15000)},{ "label":w4,"value":getRandomInt(10000,15000)},
  {"label":w3,"value":getRandomInt(10000,15000)},{"label":w2,"value":getRandomInt(10000,15000)},
  {"label":w1,"value":getRandomInt(10000,15000)} ]
}            
];


        //Below Logic is to add a new object to the prodgraphweekly_data array with the total inventory which is received - shipped cases
    /**    
          var  recvw=[];
          var dtw=[];
        for (var i=0;i<$scope.prodgraphweekly_data[0].values.length;i++) {
        	//console.log($scope.prodgraphdaily_data[0].values[i]);
             recvw.push($scope.prodgraphweekly_data[0].values[i].value);
             dtw.push($scope.prodgraphweekly_data[0].values[i].label)
        }

        var shpw=[];
        for (var i=0;i<$scope.prodgraphweekly_data[1].values.length;i++) {
             shpw.push($scope.prodgraphweekly_data[1].values[i].value);
        }
            
        var totw=[];

         for (var j = 0;j<$scope.prodgraphweekly_data[1].values.length;j++) {
             var val=recvw[j] - shpw[j];
             totw.push({"label":dtw[j],"value":val});
         }
         
         $scope.prodgraphweekly_data.push({key:"Total Inventory",values:totw});
        // console.log($scope.prodgraphweekly_data)
        **/

        $scope.prodgraphweekly_options = {
          chart: {
            type: 'lineChart',
            height: 370,
            margin : {
              top: 30,
              right: 0,
              bottom: 40,
              left:40
            },

            x: function(d){ return d.label},
            y: function(d){ return d.value},
            showValues: true,
            color: d3.scale.category10().range(),
            duration: 300,
            useInteractiveGuideline: true,
            clipVoronoi: false,
            xAxis: {
              axisLabel: 'Date',
          //  tickPadding:0,
          showMaxMin:false,
          ticks:4,
        //    rotateLabels: -45,
        tickFormat:function(d) {
          return d3.time.format('Week' +'%U')(new Date(d))
        },
          //    tickValues: function(values) {
      //return _.map(values[0].values, function(v) {
      //return new Date(v.label);
      //})
     //}
   },
   reduceYTicks: true,
   reduceXTicks: true,
   yAxis: {
    axisLabel: 'Number of Cases',
    tickValues:[5000,10000,15000],
    showMaxMin:false,
    tickFormat:d3.format()
  },
},
title: {
  enable: true,
  text: 'DC PRODUCTIVITY - WEEKLY',
  css: {
    'text-align': 'left',
    'margin': '10px 13px 0px 7px',
    'font-size':'16px',
    'color':'#29B4B6',
    'font-width':'bold',
    'font-family':'segoe ui'
  }
},



};




//*****************************************************************************************************
//                            MONTHLY PRODUCTIVITY GRAPH
//*****************************************************************************************************

//Logic to get the past 12 months with year

//var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var mdat=new Date();
var my1=new Date(mdat.getFullYear(), mdat.getMonth(), 1).getTime();
var my2=new Date(mdat.getFullYear(), mdat.getMonth() - 1, 1).getTime();
var my3=new Date(mdat.getFullYear(), mdat.getMonth() - 2, 1).getTime();
var my4=new Date(mdat.getFullYear(), mdat.getMonth() - 3, 1).getTime();
var my5=new Date(mdat.getFullYear(), mdat.getMonth() - 4, 1).getTime();
var my6=new Date(mdat.getFullYear(), mdat.getMonth() - 5, 1).getTime();
var my7=new Date(mdat.getFullYear(), mdat.getMonth() - 6, 1).getTime();
var my8=new Date(mdat.getFullYear(), mdat.getMonth() - 7, 1).getTime();
var my9=new Date(mdat.getFullYear(), mdat.getMonth() - 8, 1).getTime();
var my10=new Date(mdat.getFullYear(), mdat.getMonth() - 9, 1).getTime();
var my11=new Date(mdat.getFullYear(), mdat.getMonth() - 10, 1).getTime();
var my12=new Date(mdat.getFullYear(), mdat.getMonth() - 11, 1).getTime();


$scope.prodgraphmonthly_options = {
  chart: {
    type: 'lineChart',
    height: 370,
    margin : {
      top: 30,
      right: 0,
      bottom: 40,
      left:40
    },

    x: function(d){ return d.date },
    y: function(d){ return d.value},
    showValues: true,
    color: d3.scale.category10().range(),
    duration: 300,
    useInteractiveGuideline: true,
    clipVoronoi: false,
    duration: 500,
    xAxis: {
      axisLabel: 'Date',
      tickPadding:0,
          //  rotateLabels: -45,
          showMaxMin:false,
          tickFormat:function(d) {
           return d3.time.format('%b %Y')(new Date(d))
         },
            //    tickValues: function(values) {
      //return _.map(values[0].values, function(v) {
      //return new Date(v.date);
      //})
      // }
    },
    reduceXTicks: false,
    yAxis: {
      axisLabel: 'Number of Cases',
      showMaxMin:false,
      tickFormat:d3.format()   
    },
  },

  title: {
    enable: true,
    text: 'DC PRODUCTIVITY - MONTHLY',
    css: {
            'text-align': 'left',
            'margin': '10px 13px 0px 7px',
            'font-size':'16px',
            'color':'#29B4B6',
            'font-width':'bold',
            'font-family':'segoe ui'
        }

  },
};

$scope.prodgraphmonthly_data = [
{
  key: "Received Cases",
               // mean: 250,
               values: [ {"date":my12 ,"value":getRandomInt(20000,30000)},{"date":my11,"value":getRandomInt(20000,30000)},
               {"date":my10,"value":getRandomInt(20000,30000)},{"date": my9,"value":getRandomInt(20000,30000)} ,
               {"date":my8,"value":getRandomInt(20000,30000)},{"date":my7,"value":getRandomInt(20000,30000)},
               {"date": my6 ,"value":getRandomInt(20000,30000)},{"date":my5,"value":getRandomInt(20000,30000)},
               {"date":my4,"value":getRandomInt(20000,30000)},{"date":my3,"value":getRandomInt(20000,30000)},
               {"date":my2,"value":getRandomInt(20000,30000)},{"date":my1,"value":getRandomInt(20000,30000)} ]
             },
             {
              key: "Shipped Cases",
              //  mean: -60,
              values: [ {"date":my12 ,"value":getRandomInt(20000,30000)},{"date":my11,"value":getRandomInt(20000,30000)},
              {"date":my10,"value":getRandomInt(20000,30000)},{"date": my9,"value":getRandomInt(20000,30000)} ,
              {"date":my8,"value":getRandomInt(20000,30000)},{"date":my7,"value":getRandomInt(20000,30000)},
              {"date": my6 ,"value":getRandomInt(20000,30000)},{"date":my5,"value":getRandomInt(20000,30000)},
              {"date":my4,"value":getRandomInt(20000,30000)},{"date":my3,"value":getRandomInt(20000,30000)},
              {"date":my2,"value":getRandomInt(20000,30000)},{"date":my1,"value":getRandomInt(20000,30000)} ]
            },  
            {
              key: "Total Inventory",
              //  mean: -60,
              values: [ {"date":my12 ,"value":getRandomInt(100000,120000)},{"date":my11,"value":getRandomInt(100000,120000)},
              {"date":my10,"value":getRandomInt(100000,120000)},{"date": my9,"value":getRandomInt(100000,120000)} ,
              {"date":my8,"value":getRandomInt(100000,120000)},{"date":my7,"value":getRandomInt(100000,120000)},
              {"date": my6 ,"value":getRandomInt(100000,120000)},{"date":my5,"value":getRandomInt(100000,120000)},
              {"date":my4,"value":getRandomInt(100000,120000)},{"date":my3,"value":getRandomInt(100000,120000)},
              {"date":my2,"value":getRandomInt(100000,120000)},{"date":my1,"value":getRandomInt(100000,120000)} ]
            }            

            ];


        //Below Logic is to add a new object to the prodgraphweekly_data array with the total inventory which is received - shipped cases
     /**   
          var  recvm=[];
          var dtm=[];
        for (var i=0;i<$scope.prodgraphmonthly_data[0].values.length;i++) {
             recvm.push($scope.prodgraphmonthly_data[0].values[i].value);
             dtm.push($scope.prodgraphmonthly_data[0].values[i].date)
        }

        var shpm=[];
        for (var i=0;i<$scope.prodgraphmonthly_data[1].values.length;i++) {
             shpm.push($scope.prodgraphmonthly_data[1].values[i].value);
        }
            
        var totm=[];

         for (var j = 0;j<$scope.prodgraphmonthly_data[1].values.length;j++) {
             var val=recvm[j] - shpm[j];
             totm.push({"date":dtm[j],"value":val});
         }
         
         $scope.prodgraphmonthly_data.push({key:"Total Inventory",values:totm})
         **/

//*****************************************************************************************************
//                            ANGULAR GAUGE FOR MOBILE HOME SCREEN ICON FOR PRODUCTIVITY GRAPH
//*****************************************************************************************************

$scope.title="";
$scope.levelColors=[];

if (recvtoday>recvyest) {
 recvgaugeper=(100 - Math.floor((recvyest*100)/recvtoday));
 $scope.recvgaugevalue=recvgaugeper;
 //  $scope.title='RECEIVING ' + $scope.recvgaugevalue+'%'+' HIGHER THAN YESTERDAY';
 $scope.title="RECEIVING";
 $scope.levelColors=['#4ce600'];
 console.log($scope.levelColors);
 $scope.textRendererrcv = function (value) {
  return value+'% HIGHER';
};
}

if (recvtoday<recvyest) {
 recvgaugeper=(100 - Math.floor((recvtoday*100)/recvyest));
 $scope.recvgaugevalue=recvgaugeper;
   //$scope.title='RECEIVING ' + $scope.recvgaugevalue+'%'+' LOWER THAN YESTERDAY';
   $scope.title="RECEIVING";
   $scope.levelColors=['#ff3300'];
   console.log($scope.levelColors);
   $scope.textRendererrcv = function (value) {
    return value+'% LOWER';
  };
}

if (recvtoday==recvyest) {
 $scope.recvgaugevalue=0;
   //$scope.title='RECEIVING RATE SAME AS YESTERDAY';
   $scope.title="RECEIVING";
   $scope.levelColors=['#4ce600'];
   console.log($scope.levelColors);
   $scope.textRendererrcv = function (value) {
    return 'SAME';
  };
}

if (shptoday>shpyest) {
 shpgaugeper=(100 - Math.floor((shpyest*100)/shptoday));
 $scope.shpgaugevalue=shpgaugeper;
    //  $scope.title='SHIPPING ' + $scope.shpgaugevalue + '%' + ' HIGHER THAN YESTERDAY';
    $scope.shptitle="SHIPPING";
    $scope.levelColorsShip=['#4ce600'];
    console.log($scope.levelColors);
    $scope.textRenderershp = function (value) {
      return value+'% HIGHER';
    };
  }

  if (shptoday<shpyest) {
   shpgaugeper=(100 - Math.floor((shptoday*100)/shpyest));
   $scope.shpgaugevalue=shpgaugeper;
 // $scope.title='SHIPPING ' + $scope.shpgaugevalue + '%' + ' LOWER THAN YESTERDAY';
 $scope.shptitle="SHIPPING";
 $scope.levelColorsShip=['#ff3300'];
 console.log($scope.levelColors);
 $scope.textRenderershp = function (value) {
  return value+'% LOWER';
};
}

if (shptoday==shpyest) {
 $scope.shpgaugevalue=0;
 //     $scope.title='SHIPPING RATE SAME AS YESTERDAY';
 $scope.title="SHIPPING";
 $scope.levelColorsShip=['#4ce600'];
 console.log($scope.levelColors);
 $scope.textRenderershp = function (value) {
  return 'SAME';
};
}

console.log(recvtoday+" "+recvyest+" "+shptoday+" "+shpyest);
console.log($scope.recvgaugevalue);
console.log($scope.recvgaugevalue);

   // $scope.title = 'CASES SHIPPED TODAY';
   $scope.titleFontColor = 'blue';

   $scope.valueFontColor = 'black';

   $scope.min = 0;
   $scope.max=100;
   $scope.valueMinFontSize = "15px";
   $scope.titleMinFontSize = 10;
   $scope.labelMinFontSize = undefined;
   $scope.minLabelMinFontSize = undefined;
   $scope.maxLabelMinFontSize = undefined;

   $scope.hideValue = false;
   $scope.hideMinMax = false;
   $scope.hideInnerShadow = false;

   $scope.width = 180;
   $scope.height = 200;
   $scope.relativeGaugeSize = false;

   $scope.gaugeWidthScale = 0.6;
   $scope.gaugeColor = '#d9d9d9';

   $scope.showInnerShadow = true;
   $scope.shadowOpacity = 0.5;
   $scope.shadowSize = 3;
   $scope.shadowVerticalOffset = 10;

            //$scope.levelColors = ['#00FFF2', '#668C54', '#FFAF2E', '#FF2EF1'];
          //  $scope.noGradient = true;
          $scope.levelColorsGradient=false;

            // var gauge_title="Case Receiving Status"+gauge_title_date;
            $scope.label ='';
            $scope.labelFontColor = 'blue';
            $scope.relativeGaugeSize=false;

            $scope.startAnimationTime = 3000;
            $scope.startAnimationType = 'linear';
            $scope.refreshAnimationTime = 3000;
            $scope.refreshAnimationType = 'linear';


            $scope.counter = true;
            $scope.decimals = 2;
            $scope.symbol = '%';
            $scope.formatNumber = false;
            $scope.humanFriendly = false;
            $scope.humanFriendlyDecimal = false;


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
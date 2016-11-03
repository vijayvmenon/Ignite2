angular.module('ignite2.supervisorSearch')

.controller('itemDetailsController', ['$scope','$state','$stateParams', 'supItemSvc','dataFactory',function($scope,$state,$stateParams,supItemSvc,dataFactory){
	
	$scope.itemnbr=dataFactory.supwikitext[0];
	console.log('reached item details supervisor');
	console.log(dataFactory.supwikitext[0]);



//Below Logic is to show the Daily, MWeekly, Monthly Graphs based on click of Button
$scope.supItemSvc=supItemSvc;

$scope.showDailyfn=function() {
$scope.supItemSvc.showDaily=true;
$scope.supItemSvc.showWeekly=false;
$scope.supItemSvc.showMonthly=false;
};

$scope.showWeeklyfn=function() {
$scope.supItemSvc.showDaily=false;
$scope.supItemSvc.showWeekly=true;
$scope.supItemSvc.showMonthly=false;
};

$scope.showMonthlyfn=function() {
$scope.supItemSvc.showDaily=false;
$scope.supItemSvc.showWeekly=false;
$scope.supItemSvc.showMonthly=true;
};

//End of Logic above


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
         tickValues: function(values) {
      return _.map(values[0].values, function(v) {
      return new Date(v.date);
      })
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
        text: 'Item Statistics - Daily'
        },
};

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



 $scope.prodgraphdaily_data = [
            {
                key: "Received Cases",
               // mean: 250,
                values: [ {"date":dat9,"value":84},{"date":dat8,"value":68},{"date":dat7,"value":76},{"date":dat6,"value":93},
                {"date":dat5,"value":49},{"date":dat4,"value":62},{"date":dat3,"value":51},{"date":dat2,"value":59},
                {"date":dat1,"value":78},{"date":dat,"value":85} ]
            },
            {
                key: "Shipped Cases",
              //  mean: -60,
                 values: [{"date":dat9,"value":45},{"date":dat8,"value":22},{"date":dat7,"value":54},{"date":dat6,"value":67},
                {"date":dat5,"value":34},{"date":dat4,"value":38},{"date":dat3,"value":21},{"date":dat2,"value":34},
                {"date":dat1,"value":63},{"date":dat,"value":50} ]
            }

        ];

//console.log($scope.prodgraphdaily_data);

        //Below Logic is to add a new object to the prodgraphdaily_data array with the total inventory which is received - shipped cases
        
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
     // console.log($scope.prodgraphdaily_data);


//*******************************************************************************
//                WEEKLY LOGIC
//*******************************************************************************

//Below function gets the first and last day of the week in mm/DD format. The data is passed as input to the function

$scope.getWeekFirstLast = function(dt) {
//var firstday = new Date(dt.setDate(dt.getDate() - dt.getDay())).toISOString().slice(5,10).replace(/-/g,"/");
//var lastday = new Date(dt.setDate(dt.getDate() - dt.getDay()+6)).toISOString().slice(5,10).replace(/-/g,"/");
var lastday = new Date(dt.setDate(dt.getDate() - dt.getDay()+6)).getTime();
//console.log(firstday+"/"+lastday);
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
                values: [ {"label":w10 ,"value":160},{"label":w9,"value":275},{"label":w8,"value":383},{"label":w7,"value":172},
                {"label":w6,"value":478},{"label":w5,"value":255},{ "label":w4,"value":561},{"label":w3,"value":282},{"label":w2,"value":78},
               {"label":w1,"value":345} ]
            },
            {
                key: "Shipped Cases",
               values: [ {"label":w10,"value":125},{"label":w9,"value":130},{"label":w8,"value":210},{"label":w7,"value":110},
               {"label":w6 ,"value":210 },{"label":w5,"value":120},{"label":w4,"value":250},{"label":w3,"value":130},{"label":w2,"value":23},
               {"label":w1,"value":150} ]
            }
        ];


        //Below Logic is to add a new object to the prodgraphweekly_data array with the total inventory which is received - shipped cases
        
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
         console.log($scope.prodgraphweekly_data)


$scope.prodgraphweekly_options = {
    chart: {
        type: 'lineChart',
        height: 370,
       margin : {
            top: 20,
            right: 20,
            bottom: 100,
            left:100
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
            tickPadding:0,
            rotateLabels: -45,
        tickFormat:function(d) {
        return d3.time.format('Week' +'%U - %b %d,%Y')(new Date(d))
     },
              tickValues: function(values) {
      return _.map(values[0].values, function(v) {
      return new Date(v.label);
      })
     }
 },
        reduceXTicks: true,
        yAxis: {
            axisLabel: 'Number of Cases',
       tickFormat:d3.format()   
       },
},
    title: {
        enable: true,
        text: 'DC Productivity - Weekly'
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
            top: 20,
            right: 20,
            bottom:50,
            left:100
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
            rotateLabels: -45,
           tickFormat:function(d) {
           return d3.time.format('%b %Y')(new Date(d))
       },
                tickValues: function(values) {
      return _.map(values[0].values, function(v) {
      return new Date(v.date);
      })
       }
   },
        reduceXTicks: true,
        yAxis: {
            axisLabel: 'Number of Cases',
       tickFormat:d3.format()   
        },
      },

    title: {
        enable: true,
        text: 'DC Productivity - Monthly'
        },
};

$scope.prodgraphmonthly_data = [
            {
                key: "Received Cases",
               // mean: 250,
                values: [ {"date":my12 ,"value":1600},{"date":my11,"value":2750},{"date":my10,"value":3830},{"date": my9,"value":1720} ,
                 {"date":my8,"value":4780},{"date":my7,"value":2550},{"date": my6 ,"value":5610},{"date":my5,"value":2820},
               {"date":my4,"value":780},{"date":my3,"value":3450},{"date":my2,"value":4560},{"date":my1,"value":6720} ]
            },
            {
                key: "Shipped Cases",
              //  mean: -60,
                  values: [ {"date":my12,"value":1200}, { "date":my11 ,"value":2340} , {"date":my10 ,"value":2500}, {"date":my9,"value":900},
                   {"date":my8,"value":3400},{"date": my7, "value":1230},{"date": my6,"value":4570},
                  {"date":my5,"value":1300},{"date":my4,"value":600},{"date":my3,"value":3400},{"date":my2,"value":4200},
                  {"date":my1,"value":5600} ]
            },  

        ];


        //Below Logic is to add a new object to the prodgraphweekly_data array with the total inventory which is received - shipped cases
        
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
    //  console.log($scope.prodgraphmonthly_data);

//console.log($filter('date')(d,'w'));

}])


//The service below is used to Intialize the showDaily variable
// to true so that when the page is loaded, the daily productivity is shown by default

.factory('supItemSvc', function(){
	return {
	showDaily:true,
    showWeekly:false,
    showMonthly:false
	}
});
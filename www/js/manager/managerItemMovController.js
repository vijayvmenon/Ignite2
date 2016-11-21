angular.module('ignite2.managerDashboard')

.controller('manItemMvmtCntrl', ['$scope','$http','$filter','$location','$ionicPopup','localStorageService', 'manItemSvc','$stateParams', '$state', function($scope,$http,$filter,$location,$ionicPopup,localStorageService,manItemSvc,$stateParams,$state){


$scope.goToDetail = function() {
$state.go('managerApp.dashboard.itemmvmt',{notify:false,reload:false});
};

 $scope.manItemSvc=manItemSvc;

$scope.showtopfn=function() {
$scope.manItemSvc.showtop=true;
$scope.manItemSvc.showbottom=false;
};

$scope.showbottomfn=function() {
$scope.manItemSvc.showtop=false;
$scope.manItemSvc.showbottom=true;
};

var getRandomInt=function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randElemsWithoutReplace = function (ls_, n) {
  var ls = ls_.slice();
  var selections = [];
  for (var i = 0; i < n; i++) {
    selections.push(ls.splice(Math.floor(Math.random()*ls.length), 1)[0]);
  }
  return selections;
};

var item_desc_temp=[];
var item_desc_distinct=[];
$http.get('js/manager/item_desc.json').success(function(data) {
item_desc_temp=data;
//var rand_item_desc = item_desc_temp[Math.floor(Math.random() * item_desc_temp.length)];
item_desc_distinct=randElemsWithoutReplace(item_desc_temp,200);
console.log(item_desc_distinct);
//JSOn Array with all items 
 var item_data = [];
 for (var i=0;i<200;i++) {
   var itm={"id":getRandomInt(100000,999999),"description":item_desc_distinct[i],"qty":getRandomInt(500,9999)};
   item_data.push(itm);
 }

//Logic to get the top 10 Items from above JSON
   var topitems = item_data.sort(function(a, b) { return a.qty < b.qty ? 1 : -1; })
                .slice(0, 10); 

//The top item in the DC
   $scope.top_item=topitems.slice(-1)[0].description;             

//Logic to get bottom 10 Items from ABove array
    var bottomitems= item_data.sort(function(a, b) { return a.qty < b.qty ? 1 : -1; })
                .slice(item_data.length-10);  

//Last item in the DC
$scope.last_item=bottomitems.slice(0)[0].description;

 $scope.topitem_data= [
            {
                "key":"Top10",
                "color": "#1f77b4",
                "values": topitems
                }
         ] ;

 $scope.bottomitem_data= [
            {
                "key":"bottom10",
                "color": "#d62728",
                "values": bottomitems
                }
         ]   ;   


 //Define the NVD3 graph options in the same http success function
 
 $scope.topitemmvmtgraph_options = {
    chart: {
         type: 'multiBarHorizontalChart',
                height: 400,
                width: 380,
                x: function(d){return d.id;},
                y: function(d){return d.qty;},
                showControls: true,
                showValues: true,
                duration: 500,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Values',
                    tickFormat: function(d){
                        return d3.format(',.0f')(d);
                    }
                },
                //Below 3 options are to disable Legends, Controls and increase space between bars
                showLegend: false,
                showControls:false,
                groupSpacing:0.5,
                useInteractiveGuideline:false,
                     tooltip: {
                contentGenerator: function (e) {
                 //  console.log(e);
                  var series = e.series[0];
                  var data=e.data;
                 // console.log(data);
                  if (series.value === null) return;
                  var rows = 
                    "<tr>" +
                      "<td class='x-value'>" + "<b>" + "Item Number" +  "</td>" +
                    "</tr>"+
                    "<tr>" +
                      "<td class='x-value'>" + data.id +  "</td>" +
                    "</tr>"+                    
                    "<tr>" +
                      "<td class='x-value'>" + "<b>" + "Item Description" +  "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td class='x-value'>" + data.description +  "</td>" +
                    "</tr>";
                    
                  return "<table>" +
                   //   header  +
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
        text: 'Top 10 MOVING ITEMS',
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

$scope.bottomitemmvmtgraph_options = {
    chart: {
                type: 'multiBarHorizontalChart',
                height: 400,
                width:380,
                x: function(d){return d.id;},
                y: function(d){return d.qty;},
                showControls: true,
                showValues: true,
                duration: 500,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Values',
                    tickFormat: function(d){
                        return d3.format(',.0f')(d);
                    }
                },
                showLegend: false,
                showControls:false,
                groupSpacing:0.5,
                  useInteractiveGuideline:false,
                     tooltip: {
                contentGenerator: function (e) {
                 //  console.log(e);
                  var series = e.series[0];
                  var data=e.data;
                 // console.log(data);
                  if (series.value === null) return;
                  var rows = 
                   "<tr>" +
                      "<td class='x-value'>" + "<b>" + "Item Number" +  "</td>" +
                    "</tr>"+
                    "<tr>" +
                      "<td class='x-value'>" + data.id +  "</td>" +
                    "</tr>"+                    
                    "<tr>" +
                      "<td class='x-value'>" + "<b>" + "Item Description" +  "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td class='x-value'>" + data.description +  "</td>" +
                    "</tr>";
                    
                  return "<table>" +
                   //   header  +
                      "<tbody>" + 
                        rows + 
                      "</tbody>" +
                    "</table>";
              //    return series.color + "  " + series.key + "  " + series.value + "%";
              },
            distance: 30,
          id: "nvtooltip-bottom-item"
          }
    },

    title: {
        enable: true,
        text: 'LOWEST 10 MOVING ITEMS',
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

})



}])


.factory('manItemSvc', function(){
  return {
  showtop:true,
    showbottom:false
  }
});


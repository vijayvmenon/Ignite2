angular.module('ignite2.managerDashboard')

.controller('manItemMvmtCntrl', ['$scope','$http','$filter','$ionicPopup','localStorageService', 'manItemSvc','$stateParams', '$state', function($scope,$http,$filter,$ionicPopup,localStorageService,manItemSvc,$stateParams,$state){


 $scope.manItemSvc=manItemSvc;

$scope.showtopfn=function() {
$scope.manItemSvc.showtop=true;
$scope.manItemSvc.showbottom=false;
};

$scope.showbottomfn=function() {
$scope.manItemSvc.showtop=false;
$scope.manItemSvc.showbottom=true;
};


$scope.topitemmvmtgraph_options = {
    chart: {
         type: 'multiBarHorizontalChart',
                height: 450,
                width: 500,
                x: function(d){return d.description;},
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
                        return d3.format(',.1f')(d);
                    }
                },
                //Below 3 options are to disable Legends, Controls and increase space between bars
                showLegend: false,
                showControls:false,
                groupSpacing:0.5
            },

    title: {
        enable: true,
        text: 'Top 10 Moving Items'
        }
};

$scope.bottomitemmvmtgraph_options = {
    chart: {
                type: 'multiBarHorizontalChart',
                height: 450,
                width:500,
                x: function(d){return d.description;},
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
                        return d3.format(',.2f')(d);
                    }
                },
                showLegend: false,
                showControls:false,
                groupSpacing:0.5
            },

    title: {
        enable: true,
        text: 'Lowest 10 Moving Items'
        },
};



//JSOn Array with all items 
 var item_data = [
                {"id":1,"description":"Item1","qty":1200},{"id":2,"description":"Item2","qty":1200},{"id":3,"description":"Item3","qty":1200},
                {"id":4,"description":"Item4","qty":4500},{"id":5,"description":"Item5","qty":3450},{"id":6,"description":"Item6","qty":7000},
                {"id":7,"description":"Item7","qty":2300},{"id":8,"description":"Item8","qty":4510},{"id":9,"description":"Item9","qty":6590},
                {"id":10,"description":"Item10","qty":7240},{"id":11,"description":"Item11","qty":6780},{"id":12,"description":"Item12","qty":2300},
                {"id":13,"description":"Item13","qty":3400},{"id":14,"description":"Item14","qty":4120},{"id":15,"description":"Item15","qty":2100},
                {"id":16,"description":"Item16","qty":8390},{"id":17,"description":"Item17","qty":7850},{"id":18,"description":"Item18","qty":6500},
                {"id":19,"description":"Item19","qty":5200},{"id":20,"description":"Item20","qty":1980},{"id":21,"description":"Item21","qty":820},
                {"id":22,"description":"Item22","qty":1300},{"id":23,"description":"Item23","qty":3120},{"id":24,"description":"Item24","qty":2150},
                {"id":25,"description":"Item25","qty":1100},{"id":26,"description":"Item26","qty":540},{"id":27,"description":"Item27","qty":1890},
                {"id":28,"description":"Item28","qty":4520},{"id":29,"description":"Item29","qty":4310},{"id":30,"description":"Item30","qty":320},
                {"id":31,"description":"Item31","qty":2400},{"id":32,"description":"Item32","qty":1460},{"id":33,"description":"Item33","qty":1100},
                {"id":34,"description":"item34","qty":3200},{"id":35,"description":"item35","qty":4120},{"id":36,"description":"Item36","qty":1730},
                {"id":37,"description":"Item37","qty":940},{"id":38,"description":"Item38","qty":470},{"id":39,"description":"item39","qty":1200},
                {"id":40,"description":"Item40","qty":3200},{"id":41,"description":"Item41","qty":1500},{"id":42,"description":"Item42","qty":230},
                {"id":43,"description":"Item43","qty":670},{"id":44,"description":"Item44","qty":1300},{"id":45,"description":"Item45","qty":420},                                
                {"id":46,"description":"Item46","qty":3170},{"id":47,"description":"Item47","qty":2800},{"id":48,"description":"Item48","qty":190},
                {"id":49,"description":"Item49","qty":4960},{"id":50,"description":"Item50","qty":1570}             
              ]


//Logic to get the top 10 Items from above JSON
   var topitems = item_data.sort(function(a, b) { return a.qty < b.qty ? 1 : -1; })
                .slice(0, 10); 

//Logic to get bottom 10 Items from ABove array
    var bottomitems= item_data.sort(function(a, b) { return a.qty < b.qty ? 1 : -1; })
                .slice(item_data.length-10);  

 $scope.topitem_data= [
            {
                "key":"Top10",
                "color": "#d62728",
                "values": topitems
                }
         ] ;

 $scope.bottomitem_data= [
            {
                "key":"bottom10",
                "color": "#1f77b4",
                "values": bottomitems
                }
         ]   ;           

console.log($scope.topitem_data,$scope.bottomitem_data);

}])


.factory('manItemSvc', function(){
  return {
  showtop:true,
    showbottom:false
  }
});




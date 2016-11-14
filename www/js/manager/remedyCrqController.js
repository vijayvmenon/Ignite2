angular.module('ignite2.managerDashboard')


.controller('manRemedyCrqCntrl', ['$scope',function($scope){
	
  $scope.opentickets=15;
  //$scope.totaltickets=27;
  $scope.opencrqs=3;
  $scope.totalcrqs=5;
  $scope.recvticketcount=4;
  $scope.shipticketcount=3;
  $scope.qaticketcount=5
  $scope.opticketcount=3;
  $scope.networkcrqcount=1;
  $scope.unixcrqcount=1;
  $scope.glscrqcount=1;

var getRandomInt=function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


        $scope.ticket_data= [{key: "Receiving",value: getRandomInt(3,5),critical:getRandomInt(0,2)},
        {key: "OP",value: getRandomInt(3,5),critical:getRandomInt(0,2)},
        {key: "OF",value: getRandomInt(3,5),critical:getRandomInt(0,2)},
        {key: "Shipping",value: getRandomInt(3,5),critical:getRandomInt(0,2)},
        {key: "QA",value: getRandomInt(3,5),critical:getRandomInt(0,2)},
        {key: "Invoicing",value: getRandomInt(3,5),critical:getRandomInt(0,2)}];

        $scope.crq_data= [{key: "Network",value: getRandomInt(1,2),critical:getRandomInt(0,1)},
        {key: "DC Admin",value: getRandomInt(1,2),critical:getRandomInt(0,1)},
        {key: "GLS",value: getRandomInt(1,2),critical:getRandomInt(0,1)},
        {key: "NOC",value: getRandomInt(1,2),critical:getRandomInt(0,1)},
        {key: "Third Party",value: getRandomInt(1,2),critical:getRandomInt(0,1)}];


     $scope.ticket_options = {
            chart: {
                type: 'pieChart',
                height: 450,
                width: 450,
              margin: {
                        top: 80,
                        right: 0,
                        bottom:0 ,
                        left: -30
                    },
               donut:true,
                x: function(d){return d.key;},
                y: function(d){return d.value;},
                valueFormat:d3.format(".0f"),
                showLabels: true,
                           pie: {
                startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
            },

                duration: 500,
              showLegend: false
            },
        };

     $scope.crq_options = {
            chart: {
                type: 'pieChart',
                height: 450,
                width: 450,
              margin: {
                        top:0,
                        right: 0,
                        bottom:0 ,
                        left: -30
                    },
               donut:true,
                x: function(d){return d.key;},
                y: function(d){return d.value;},
                valueFormat:d3.format(".0f"),
                showLabels: true,
                           pie: {
                startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
            },

                duration: 500,
              showLegend: false
            },
        };



         $scope.opentickets=0;
         $scope.opencrq=0;
         for (var i=0;i<$scope.ticket_data.length;i++) {
            $scope.opentickets+=$scope.ticket_data[i].value;
          }

                   for (var i=0;i<$scope.crq_data.length;i++) {
            $scope.opencrq+=$scope.crq_data[i].value;
          }
}])


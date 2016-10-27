angular.module('ignite2.notificationController', [])

.controller('notificationCntrl',function ($scope) {

$scope.not_details="Details here";

   $scope.showNotifDetails=false;

  $scope.toggleGroup = function() {
    if ($scope.showNotifDetails == true) {
        console.log('true');
    $scope.showNotifDetails=false;
    return;

}

    if ($scope.showNotifDetails == false) { 
        console.log('false');
    $scope.showNotifDetails=true;
    return;
}

};
 
});

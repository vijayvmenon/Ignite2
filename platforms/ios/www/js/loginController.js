angular.module('ignite2.loginController', [])


//This is the Controller that controls login to the Application
.controller('LoginCtrl', ['$scope','LoginService','$rootScope','$interval','$ionicPopup','$state', function($scope,LoginService,$rootScope,$interval,$ionicPopup, $state) {
  
   $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
          if($scope.data.username == 'manager') {
            $state.go('managerApp');
          };
         if($scope.data.username == 'suprvsr') {
            $state.go('suprvsrApp');
          }
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }

}]);






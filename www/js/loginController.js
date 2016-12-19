angular.module('ignite2.loginController', [])


//This is the Controller that controls login to the Application
.controller('LoginCtrl', ['$scope','LoginService','$rootScope','$ionicAuth', '$ionicUser','$interval','$ionicModal','$ionicPopup','$state', function($scope,LoginService,$rootScope,$ionicAuth, $ionicUser,$interval,$ionicModal,$ionicPopup, $state) {
  
  $scope.pswdresetclicked=false;
   $scope.data = {};
   $scope.userRole="Supervisor";

     $ionicModal.fromTemplateUrl('templates/newuser.html', {
      id:'1',
    scope: $scope
  }).then(function(modal) {
    $scope.oModal1 = modal;
  });

       $ionicModal.fromTemplateUrl('templates/passwdreset.html', {
        id:'2',
    scope: $scope
  }).then(function(modal) {
    $scope.oModal2 = modal;
  });
 
    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      $scope.pswdresetclicked=false;
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };


$scope.newUser={'email':'','password':''};
$scope.currUser={'email':'','password':''};

$scope.createUser=  function(newuser) {
 $ionicAuth.signup(newuser).then(function() {
  console.log('user registered');
              var alertPopup = $ionicPopup.alert({
                title: 'User Created Successfully!!',
            });
              $scope.closeModal(1);
    $state.reload('login');
}, function(err) {
  for (var e of err.newuser) {
    if (e === 'conflict_email') {
      alert('Email already exists.');
    } else {
      // handle other errors
    }
  }
})
}


    $scope.login = function(currUser,userRole) {
$ionicAuth.login('basic',currUser).then(function() {
  console.log('user logged in');
      if(userRole == 'Manager') {
            $state.go('managerApp');
          };
         if(userRole == 'Supervisor') {
            $state.go('suprvsrApp');
          }
}, function(err) {
 console.log('invalid login');

         var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
});
    /**
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
        **/

    }


$scope.sendEmail = function(email) {
  $scope.pswdresetclicked=true;
  $ionicAuth.requestPasswordReset(email);
              var alertPopup = $ionicPopup.alert({
                title: 'Email Sent Successfully!!',
            });
}

$scope.pswdreset = function(resetCode,resetPswd) {
  console.log('reached here');
$ionicAuth.confirmPasswordReset(resetCode,resetPswd).then(function() {
  console.log('reset code correct');
            var alertPopup = $ionicPopup.alert({
                title: 'Password Reset Successfully!!',
            });
           $scope.closeModal(2);
          $state.reload('login');
$scope.pswdresetclicked=false;
},function(err) {
    console.log('reached reset code error');
            var alertPopup = $ionicPopup.alert({
                title: 'Incorrect Reset Code',
            });
})
}

}]);






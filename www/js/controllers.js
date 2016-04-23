angular.module('starter.controllers', ['ionMDRipple', 'starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('HomeCtrl', function($scope, $ionicModal, $timeout, MyServices, $state) {
  var form = {
    page: 1
  };
  MyServices.getAllMatch(form, function(data) {
    $scope.matches = data.data;
    _.each($scope.matches, function(n) {
      n.timestamp = moment(n.startTime).valueOf();
    });
    console.log(data.data[1]);
  }, function(data) {
    console.log(data);
  });
})

.controller('ProfileCtrl', function($scope, $ionicModal, $timeout) {})

.controller('ContactCtrl', function($scope, $ionicModal, $timeout) {})

.controller('NotificationCtrl', function($scope, $ionicModal, $timeout) {})

.controller('MatchDetailCtrl', function($scope, $ionicModal, $timeout, $ionicScrollDelegate, $stateParams,MyServices) {
  $scope.tab = 'first';
  $scope.classa = 'actives';
  $scope.classb = '';
  var form = {
    id: $stateParams.id
  };

  MyServices.getMatch(form, function(data) {
    $scope.match = data.data;
    $scope.match.isSecondInning = $scope.match.bat != $scope.match.firstBat;
    console.log(data.data);
  }, function(data) {
    console.log(data);
  });
  $scope.tabchange = function(tab, a) {
    //        console.log(tab);
    $scope.tab = tab;
    if (a == 1) {
      // $ionicScrollDelegate.scrollTop();
      $scope.classa = "actives";
      $scope.classb = '';
    } else {
      // $ionicScrollDelegate.scrollTop();
      $scope.classa = '';
      $scope.classb = "actives";
    }
  };

})

.controller('LoginCtrl', function($scope, $ionicPopup, $timeout, MyServices, $state) {

  $scope.form = {
    contact: "9819222221",
    password: "chintan123"
  };
  $scope.loginTap = function(form) {
    MyServices.userLogin(form, function(data) {
      console.log(data);
      $state.go("app.home");
    }, function(data) {
      console.log(data);
    });
  };
  $scope.showSuccess = function() {
    var alertPopup = $ionicPopup.alert({
      scope: $scope,
      templateUrl: 'templates/signup.html',
    });





    alertPopup.then(function(res) {
      console.log('Thanks');
    });

    $scope.closPop = function() {
      console.log("Close called");
      alertPopup.close();
    };
  };
})

.controller('SettingCtrl', function($scope, $stateParams, $ionicPopup, $timeout, MyServices, $state) {

  $scope.Success = function() {
    var alertPopup = $ionicPopup.alert({
      scope: $scope,
      templateUrl: 'templates/chanagepassword.html',
    });


    alertPopup.then(function(res) {
      console.log('Thanks');
    });

    $scope.closPop = function() {
      console.log("Close called");
      alertPopup.close();
    };
  };
});

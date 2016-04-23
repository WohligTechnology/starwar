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

.controller('MatchDetailCtrl', function($scope, $ionicModal, $timeout, $ionicScrollDelegate, $stateParams, MyServices) {
  $scope.tab = 'first';
  $scope.classa = 'actives';
  $scope.classb = '';
  var form = {
    id: $stateParams.id
  };

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

  MyServices.getMatch(form, function(data) {
    $scope.match = data.data;
    $scope.match.isSecondInning = $scope.match.bat != $scope.match.firstBat;

    if ($scope.match.firstBat == 1) {
      $scope.match.inning1Overs = $scope.match.team1Overs;
      $scope.match.inning2Overs = $scope.match.team2Overs;
    } else if ($scope.match.firstBat == 2) {
      $scope.match.inning1Overs = $scope.match.team2Overs;
      $scope.match.inning2Overs = $scope.match.team1Overs;
    }

    if ($scope.match.isSecondInning) {

      $scope.match.inning1Overs = 99999;

      $scope.tabchange('second', 2);
      if ($scope.match.bat == 1) {
        $scope.match.playedBalls = getBalls($scope.match.team1Overs);
        $scope.match.currentRuns = $scope.match.team1Runs;
        $scope.match.targetRuns = $scope.match.team2Runs + 1;
      } else if ($scope.match.bat == 2) {
        $scope.match.playedBalls = getBalls($scope.match.team2Overs);
        $scope.match.currentRuns = $scope.match.team2Runs;
        $scope.match.targetRuns = $scope.match.team1Runs + 1;
      }
      $scope.match.totalBalls = getBalls($scope.match.newOvers);
      $scope.match.remainingBalls = $scope.match.totalBalls - $scope.match.playedBalls;

      $scope.match.remainingRuns = $scope.match.targetRuns - $scope.match.currentRuns;

    }



    if ($scope.match.favorite == 1) {
      $scope.match.matchRate1 = $scope.match.rate1;
      $scope.match.matchRate2 = $scope.match.rate2;

      $scope.match.matchRate3 = rateCalc($scope.match.matchRate2);
      $scope.match.matchRate4 = rateCalc($scope.match.matchRate1);
    }
    if ($scope.match.favorite == 2) {
      $scope.match.matchRate3 = $scope.match.rate1;
      $scope.match.matchRate4 = $scope.match.rate2;

      $scope.match.matchRate1 = rateCalc($scope.match.matchRate4);
      $scope.match.matchRate2 = rateCalc($scope.match.matchRate3);
    }
    console.log(data.data);
  }, function(data) {
    console.log(data);
  });


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

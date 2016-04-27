var Global = {};

angular.module('starter.controllers', ['ionMDRipple', 'starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices, $state, $rootScope) {
  $scope.$on('$ionicView.beforeEnter',
    function() {
      if (!$.jStorage.get("expiry")) {
        $state.go("login");
      }
      Global.expiryCalc();
    });

  Global.expiryCalc = function() {
    $scope.expiryDays = MyServices.calcExpiry();
    if ($scope.expiryDays < 0) {
      MyServices.expiredCallback();
    }
  };

})

.controller('HomeCtrl', function($scope, $ionicModal, $timeout, MyServices, $state) {

  var form = {
    pagenumber: "1",
    search: "",
    pagesize: "100"
  };

  $scope.$on('$ionicView.beforeEnter',
    function() {
      MyServices.getAllMatch(form, function(data) {
        $.jStorage.set("serverTime", data.serverTime);
        Global.expiryCalc();
        $scope.matches = data.data.data;
        _.each($scope.matches, function(n) {
          n.timestamp = moment(n.startTime).valueOf();
        });
      }, function(data) {

      });
    });

})

.controller('ProfileCtrl', function($scope, $ionicModal, $timeout) {})

.controller('ContactCtrl', function($scope, $ionicModal, $timeout) {})

.controller('NotificationCtrl', function($scope, $ionicModal, $timeout, MyServices) {


  var form = {
    pagenumber: "1",
    search: "",
    pagesize: "100"
  };
  $scope.$on('$ionicView.beforeEnter',
    function() {
      MyServices.getAllNotification(form, function(data) {
        $scope.notifications = data.data.data;
      }, function(data) {});

    });

})

.controller('MatchDetailCtrl', function($scope, $ionicModal, $timeout, $ionicScrollDelegate, $stateParams, MyServices) {
  $scope.tab = 'first';
  $scope.classa = 'actives';
  $scope.classb = '';
  var form = {
    "_id": $stateParams.id
  };

  io.socket.on('message', function(data) {
    console.log(data);
    SocketFunction(data,true);

  });

  $scope.tabchange = function(tab, a) {
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
  var SocketFunction = function(data,isSocket) {

    data.data.session1 = _.filter(data.data.session, function(n) {
      return n.inning == 1;
    });
    data.data.session2 = _.filter(data.data.session, function(n) {
      return n.inning == 2;
    });

    $.jStorage.set("serverTime", data.serverTime);
    Global.expiryCalc();
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
    if(isSocket)
    {
      $scope.$apply();
    }

  };

  $scope.$on('$ionicView.beforeEnter',
    function() {
      MyServices.getMatch(form, SocketFunction , function(data) {

      });


    });

})

.controller('LoginCtrl', function($scope, $ionicPopup, $timeout, MyServices, $state, $rootScope) {

  $scope.$on('$ionicView.beforeEnter',
    function() {

      $.jStorage.flush();
    }
  );
  var alertPopup = {};
  $scope.closPop = function() {

    alertPopup.close();
  };
  $scope.loginSuccess = function() {
    alertPopup = $ionicPopup.alert({
      scope: $scope,
      templateUrl: 'templates/loginSuccess.html',
    });
    $timeout(function() {
      $scope.closPop();
    }, 1500);

  };

  $scope.errorCallback = function() {
    alertPopup = $ionicPopup.alert({
      scope: $scope,
      templateUrl: 'templates/loginError.html',
    });
    $timeout(function() {
      $scope.closPop();
    }, 3000);


  };

  $scope.form = {
    contact: "",
    password: ""
  };
  $scope.loginTap = function(form) {
    MyServices.userLogin(form, function(data) {

      if (data.data.value) {
        $.jStorage.set("expiry", data.data.data.expiry);
        $scope.loginSuccess();
        $state.go("app.home");
        Global.expiryCalc();


      } else {

        if (data.data.data.message == "IncorrectCredentials") {
          $scope.errorCallback();
        } else if (data.data.data.message == "DateExpired") {
          MyServices.expiredCallback();
        }
      }

    }, function(data) {});
  };
  $scope.showSignup = function() {
    var alertPopup = $ionicPopup.alert({
      scope: $scope,
      templateUrl: 'templates/signup.html',
    });

    $scope.form2 = {
      name: "",
      contact: ""
    };
    $scope.signUpTap = function() {
      MyServices.becomeMember($scope.form2, function(data) {
        alertPopup.close();
        if (data.data.value) {
          //become member success
          var alertPopup2 = $ionicPopup.alert({
            scope: $scope,
            templateUrl: 'templates/becomeMemberSuccess.html',
          });
          $timeout(function() {
            alertPopup2.close();
          }, 1500);
        } else {
          //become member error
          alertPopup3 = $ionicPopup.alert({
            scope: $scope,
            templateUrl: 'templates/becomeMemberError.html',
          });
          $timeout(function() {
            alertPopup3.close();
          }, 1500);
        }
      }, function() {

      });

    };
    $scope.closPop = function() {
      alertPopup.close();
    };
  };
})

.controller('SettingCtrl', function($scope, $stateParams, $ionicPopup, $timeout, MyServices, $state) {
  $scope.form = {
    oldPassword: "",
    newPassword: ""
  };
  var alertPopup = {};

  $scope.closPop = function() {
    alertPopup.close();
  };
  $scope.errorCallback = function() {
    alertPopup = $ionicPopup.alert({
      scope: $scope,
      templateUrl: 'templates/changePasswordWrong.html',
    });
    $timeout(function() {
      $scope.closPop();
    }, 3000);

  };
  $scope.Success = function() {
    MyServices.changePassword($scope.form,

      function(data) { // Success Function
        data = data.data;
        if (data.value) {
          alertPopup = $ionicPopup.alert({
            scope: $scope,
            templateUrl: 'templates/changePassword.html',
          });
          $timeout(function() {
            $scope.closPop();
          }, 3000);


        } else {
          $scope.errorCallback();
        }
      },
      function(data) { // Error Function

      });






  };
});

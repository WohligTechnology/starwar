angular.module('starter.controllers', ['ionMDRipple'])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

  .controller('HomeCtrl', function($scope, $ionicModal, $timeout) {})

  .controller('ProfileCtrl', function($scope, $ionicModal, $timeout) {})

  .controller('ContactCtrl', function($scope, $ionicModal, $timeout) {})

  .controller('NotificationCtrl', function($scope, $ionicModal, $timeout) {})

  .controller('MatchDetailCtrl', function($scope, $ionicModal, $timeout, $ionicScrollDelegate) {
    $scope.tab = 'first';
    $scope.classa = 'actives';
    $scope.classb = '';
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

  .controller('LoginCtrl', function($scope, $ionicPopup, $timeout) {
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

.controller('SettingCtrl', function($scope, $stateParams) {});

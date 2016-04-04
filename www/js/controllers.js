angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})
.controller('HomeCtrl', function($scope, $ionicModal, $timeout) {

})
.controller('ProfileCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('ContactCtrl', function($scope, $ionicModal, $timeout) {

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

.controller('SettingCtrl', function($scope, $stateParams) {
});

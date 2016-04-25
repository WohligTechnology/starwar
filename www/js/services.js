var vigzserver = "http://192.168.1.128:1337/";
var adminimage = vigzserver + "upload/readFile?file=";

var foods = [];

angular.module('starter.services', ['httpService'])
  .factory('MyServices', function($http, $filter, httpService, $ionicPopup, $state, $timeout) {

    return {
      userLogin: function(form, callback, errCallback) {
        $http.post(vigzserver + "user/login", form).then(callback, errCallback);
      },
      becomeMember: function(form, callback, errCallback) {
        $http.post(vigzserver + "user/becomeMember", form).then(callback, errCallback);
      },
      getAllNotification: function(form, callback, errCallback) {
        httpService.post(vigzserver + "notificationtext/findLimited", form, callback, errCallback);
      },
      getAllMatch: function(form, callback, errCallback) {
        httpService.post(vigzserver + "match/findLimited", form, callback, errCallback);
      },
      getMatch: function(form, callback, errCallback) {
        httpService.post(vigzserver + "match/findOne", form, callback, errCallback);
      },
      changePassword: function(form, callback, errCallback) {
        $http.post(vigzserver + "user/changePassword", form).then(callback, errCallback);
      },
      calcExpiry: function() {
        return moment($.jStorage.get("expiry")).diff($.jStorage.get("serverTime"), 'days');
      },
      expiredCallback: function() {
        var alertPopup = {};
        var closPop = function() {
          console.log("Close called");
          alertPopup.close();
        };
        $state.go("login");

        alertPopup = $ionicPopup.alert({
          templateUrl: 'templates/expired.html',
        });
        $timeout(function() {
          closPop();
        }, 1500);

        alertPopup.then(function(res) {
          console.log('Thanks');
        });



      }
    };
  });

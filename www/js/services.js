var vigzserver = "http://172.20.10.3:1337/";
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
        // httpService.post(vigzserver + "match/findOne", form, callback, errCallback);
        io.socket.get(vigzserver + "match/findOne", form, function(resData) {
          callback(resData);
        });
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
          alertPopup.close();
        };
        $state.go("login");

        alertPopup = $ionicPopup.alert({
          templateUrl: 'templates/expired.html',
        });
        $timeout(function() {
          closPop();
        }, 1500);
      }
    };
  });

var vigzserver = "http://wohlig.io:81/callApi/stelward/";
var adminimage = vigzserver + "upload/readFile?file=";

var foods = [];

angular.module('starter.services', ['httpService'])
  .factory('MyServices', function($http, $filter, httpService) {
    return {
      userLogin: function(form, callback, errCallback) {
        $http.post(vigzserver + "user/login", form).then(callback, errCallback);
      },
      becomeMember: function(form, callback, errCallback) {
        $http.post(vigzserver + "user/becomeMember", form).then(callback, errCallback);
      },
      getAllNotification: function(form, callback, errCallback) {
        httpService.get(vigzserver + "notification/getAll", form, callback, errCallback);
      },
      getAllMatch: function(form, callback, errCallback) {
        httpService.get(vigzserver + "match/getAll", form, callback, errCallback);
      },
      getMatch: function(form, callback, errCallback) {
        httpService.post(vigzserver + "match/get", form, callback, errCallback);
      },
      chagePassword: function(form, callback, errCallback) {
        $http.post(vigzserver + "user/chagePassword", form).then(callback, errCallback);
      }
    };
  });
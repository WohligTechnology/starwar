var vigzserver = "http://blazen.io/";
var adminimage = vigzserver + "upload/readFile?file=";

var foods = [];

angular.module('starter.services', ['httpService'])
  .factory('MyServices', function($http, $filter, httpService) {
    return {
      userLogin: function(pageno, callback, errCallback) {
        var data = {
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "videogallery/getAllMob", data, callback, errCallback);
      }
    };
  });

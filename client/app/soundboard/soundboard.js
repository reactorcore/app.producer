angular.module('producer.soundboard', [])

.controller('soundboardController', function ($scope, Events) {
  $scope.events = [];

  $scope.getEvents = function () {
    Events.getEvents().then(function (resp) {
      var events = resp.data;
      $scope.events = events;
    });
  };

  $scope.selectEvent = function (section) {

  };

  $scope.getEvents();

});

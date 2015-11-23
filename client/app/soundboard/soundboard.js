angular.module('producer.soundboard', [])

.controller('soundboardController', function ($scope, Soundboard, Events) {
  $scope.events = [];

  $scope.getEvents = function () {
    Events.getEvents().then(function (resp) {
      var events = resp.data;
      $scope.events = events;
    });
  };

  $scope.selectEvent = function (selection) {
    Soundboard.selectEvent(selection);
  };

  $scope.getEvents();

});

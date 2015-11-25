angular.module('producer.soundboard', [])

.controller('soundboardController', function ($scope, Events, Soundboard) {
  $scope.events = [];
  $scope.selectedEvent = {};

  $scope.getEvents = function () {
    Events.getEvents().then(function (resp) {
      var events = resp.data;
      $scope.events = events;
    });
  };

  $scope.selectEvent = function (selection) {
    $scope.selectedEvent = selection;
    $scope.selectedEvent.isSelected = true;
  };

  $scope.getEvents();

});

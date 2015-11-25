angular.module('producer.soundboard', [])

.controller('soundboardController', function ($scope, Events) {
  $scope.events = [];
  $scope.selectedEvent = {};

  $scope.getEvents = function () {
    Events.getEvents().then(function (resp) {
      var events = resp.data;
      $scope.events = events;
    });
  };

  $scope.selectEvent = function (selection) {
    var selectedEvent = $scope.selectedEvent;
    selectedEvent.isSelected = true;
    selectedEvent.title = selection.title;
    selectedEvent.cron = selection.cron;
    selectedEvent.description = selection.description;

  };

  $scope.getEvents();

});

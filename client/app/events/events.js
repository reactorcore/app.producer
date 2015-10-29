angular.module('producer.events', [])

.controller('eventsController', function ($scope, Events) {
  $scope.events = [];
  $scope.detailsBox = false;
  $scope.submissionBox = true;

  $scope.event = {};
  $scope.newEvent = {};

  $scope.toggleCreateEvent = function(){
    $scope.detailsBox = false;
    $scope.submissionBox = true;
  }

  $scope.toggleEventDetails = function(event){
    $scope.event = event;
    $scope.detailsBox = true;
    $scope.submissionBox = false;
  }

  $scope.submitEvent = function(){
    Events.submitEvent($scope.newEvent);
  }

  Events.getEvents().then(function(resp){
    var events = resp.data;
    $scope.events = events;
  });

});

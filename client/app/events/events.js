angular.module('producer.events', [])

.controller('eventsController', function ($scope, Events) {
  $scope.events = [];
  $scope.showEvent = false;

  $scope.event = {};
  $scope.newEvent = {};

  $scope.submitEvent = function(){
    Events.submitEvent($scope.newEvent).then(submitSuccess, submitError)
  }

  var submitSuccess = function(response) {
    $scope.messages = 'Your event was created!';
    setTimeout(function(){
      $scope.messages = null;
      $scope.$apply();
    },3000);
    $scope.getEvents();
  };

  var submitError = function(response) {
    if ((400 <= response.status) && (response.status < 500)) {
      $scope.messages = 'Sorry, there was an error submitting your form. Please submit again.';
    } else {
      $scope.messages = response.data;
    }
    console.log('error: ', response);
  };

  $scope.getEvents = function(){
    Events.getEvents().then(function(resp){
      var events = resp.data;
      $scope.events = events;
    });
  }

  $scope.deleteEvent = function(){
    console.log($scope.event);
    Events.deleteEvent($scope.event).then(deleteSuccess, deleteError)
  };

  $scope.setMaster = function(section) {
    $scope.selected = section;
    console.log($scope.selected);
    $scope.newEvent.title = $scope.selected.title;
    $scope.newEvent.cron = $scope.selected.cron;
    $scope.newEvent.description = $scope.selected.description;
    $scope.showEvent = true;
    $scope.event = section;
  };

  $scope.createNewEvent = function() {
    $scope.newEvent.title = "";
    $scope.newEvent.cron = "";
    $scope.newEvent.description = "";
    $scope.showEvent = false;
  }

  var deleteSuccess = function(response) {
    $scope.messages = 'Event Deleted';
    setTimeout(function(){
      $scope.messages = null;
      $scope.$apply();
    },3000);
    $scope.getEvents();
  };

  var deleteError = function(response) {
    $scope.messages = 'Sorry, there was an error submitting your form. Please submit again.';
    console.log('error: ', response);
  };

  $scope.getEvents();


});

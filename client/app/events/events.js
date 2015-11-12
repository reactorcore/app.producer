angular.module('producer.events', [])

.controller('eventsController', function ($scope, Events, Messages) {
  $scope.events = [];
  $scope.showEvent = false;

  $scope.event = {};
  $scope.newEvent = {};

  $scope.submitEvent = function(){
    Events.submitEvent($scope.newEvent).then(submitSuccess, submitError)
  }

  var submitSuccess = function(response) {
    Messages.setMessage('Your event was created!');
    $scope.getEvents();
  };

  var submitError = function(response) {
    if ((400 <= response.status) && (response.status < 500)) {
      Messages.setMessage('Sorry, there was an error submitting your form. Please submit again.', 'error');
    } else {
      Message.set(response.data, 'error');
    }
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
    Events.deleteEvent($scope.event).then(deleteSuccess, deleteError);
  }

  var deleteSuccess = function(response) {
    Messages.setMessage('Event Deleted.')
    $scope.getEvents();
  };

  var deleteError = function(response) {
    Messages.setMessage('Sorry, there was an error submitting your form. Please submit again.')
    console.log('error: ', response);
  };

  $scope.getEvents();


});

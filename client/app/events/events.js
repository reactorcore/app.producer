angular.module('producer.events', ['alertMessage'])

.controller('eventsController', function ($scope, Events, Messages, Hilighter) {
  //TODO: hacky way to not carry over message
  Messages.clearMessage();
  $scope.events = [];
  $scope.showEvent = false;

  $scope.event = {};
  $scope.newEvent = {};

  $scope.getClass = function (event) {
    return Hilighter.hilight(event, $scope.event.title);
  };

  $scope.submitEvent = function(){
    Events.submitEvent($scope.newEvent).then(submitSuccess, submitError);
  };

  var submitSuccess = function(response) {
    Messages.setMessage('Your event was created!', 'success');
    $scope.getEvents();
  };

  var submitError = function(response) {
    if ((400 <= response.status) && (response.status < 500)) {
      Messages.setMessage('Sorry, there was an error submitting your form. Please submit again.', 'error');
    } else {
      Messages.setMessage(response.data, 'error');
    }
  };

  $scope.getEvents = function(){
    Events.getEvents().then(function(resp){
      var events = resp.data;
      $scope.events = events;
    });
  };

  $scope.deleteEvent = function(){
    console.log($scope.event);
    Events.deleteEvent($scope.event).then(deleteSuccess, deleteError);
  };

  $scope.setMaster = function(section) {
    $scope.selected = section;
    $scope.newEvent.title = $scope.selected.title;
    $scope.newEvent.cron = $scope.selected.cron;
    $scope.newEvent.description = $scope.selected.description;
    $scope.showEvent = true;
    $scope.event = section;
  };

  $scope.createNewEvent = function() {
    $scope.event = {};
    $scope.newEvent.title = "";
    $scope.newEvent.cron = "";
    $scope.newEvent.description = "";
    $scope.showEvent = false;
  };

  var deleteSuccess = function(response) {
    Messages.setMessage('Event Deleted.', 'success');
    $scope.getEvents();
  };

  var deleteError = function(response) {
    Messages.setMessage('Sorry, there was an error submitting your form. Please submit again.');
    console.log('error: ', response);
  };

  $scope.getEvents();


});

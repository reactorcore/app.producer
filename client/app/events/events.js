angular.module('producer.events', ['alertMessage'])

.controller('eventsController', function ($scope, Events, Messages, Hilighter) {
  //TODO: hacky way to not carry over message
  Messages.clearMessage();
  $scope.events = [];
  $scope.showEvent = false;

  $scope.event = {};
  $scope.newEvent = {};
  $scope.confirm = undefined;

  $scope.getEvents = function(){
    Events.getEvents().then(function(response){
      // filter out all events that don't have a cron
      var events = response.data.filter(function(event){return !!event.cron});
      $scope.events = events;
    });
  };

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
      Messages.setMessage('Sorry, there was an error submitting your event. Please submit again.', 'error');
    } else {
      Messages.setMessage(response.data, 'error');
    }
  };

  $scope.updateEvent = function() {
    Events.deleteEvent($scope.event)
    .then(function() {
      $scope.getEvents();
      Events.submitEvent($scope.newEvent)
      .then(updateSuccess, updateError);
    }, deleteError);
  };

  var updateSuccess = function(response) {
    Messages.setMessage('Your event was updated!', 'success');
    $scope.getEvents();
  };

  var updateError = function(response) {
    if ((400 <= response.status) && (response.status < 500)) {
      Messages.setMessage('Sorry, there was an error updating your event. Please submit again.', 'error');
    } else {
      Messages.setMessage(response.data, 'error');
    }
  }

  $scope.deleteEvent = function(){
    if ($scope.confirm) {
      Events.deleteEvent($scope.event).then(deleteSuccess, deleteError);
      $scope.confirm = undefined;
    } else {
      $scope.confirm = 'content__delete--confirm';
    }
  };

  var deleteSuccess = function(response) {
    Messages.setMessage('Event Deleted.', 'success');
    $scope.event = {};
    $scope.showEvent = false;
    $scope.newEvent = {};
    $scope.getEvents();
  };

  var deleteError = function(response) {
    Messages.setMessage('Sorry, there was an error deleting your event. Please try again.');
    console.log('error: ', response);
  };

  $scope.setMaster = function(section) {
    $scope.selected = section;
    $scope.newEvent.title = $scope.selected.title;
    $scope.newEvent.cron = $scope.selected.cron;
    $scope.newEvent.description = $scope.selected.description;
    $scope.showEvent = true;
    $scope.event = section;
    $scope.confirm = undefined;
    Messages.clearMessage();
  };

  $scope.createNewEvent = function() {
    $scope.event = {};
    $scope.newEvent.title = "";
    $scope.newEvent.cron = "";
    $scope.newEvent.description = "";
    $scope.showEvent = false;
  };

  $scope.getEvents();

});

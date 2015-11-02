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
    Events.submitEvent($scope.newEvent).then(submitSuccess, submitError)
  }

  var submitSuccess = function(response) {
    $scope.messages = 'Your event was created!';
    setTimeout(function(){$scope.messages=null},3000);
    console.log(' ---- RESPONSE DATA ---- : ', response, '------------------------------');
    $scope.getEvents();
  };

  var submitError = function(response) {
    $scope.messages = 'Sorry, there was an error submitting your form. Please submit again.';
    console.log('error: ', response);
  };

  $scope.getEvents = function(){
    Events.getEvents().then(function(resp){
      var events = resp.data;
      $scope.events = events;
    });
  }

  $scope.getEvents();


});

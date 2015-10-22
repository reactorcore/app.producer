angular.module('producer.events', [])

.controller('eventsController', function ($scope) {
  $scope.events = [];
  $scope.detailsBox = false;
  $scope.submissionBox = true;

  $scope.event = {
    title: 'Amazing event',
    cron: '0 2 1-10 * * du -h --max-depth=1',
    description: 'Descriptions and things!'
  };

  $scope.toggleCreateEvent = function(){
    $scope.detailsBox = false;
    $scope.submissionBox = true;
  }

  $scope.toggleEventDetails = function(){
    $scope.detailsBox = true;
    $scope.submissionBox = false;
  }

  for (var i = 1; i < 15; i++){
    $scope.events.push({title: 'Event ' + i})
  }

});

angular.module('producer.events', [])

.controller('eventsController', function ($scope) {
  $scope.events = ['item', 'item2', 'item3', 'item4', 'item5', 6,7,8,9,10,11,12,13,14,15];
  $scope.detailsBox = false;
  $scope.submissionBox = true;
});

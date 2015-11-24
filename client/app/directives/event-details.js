angular.module('event-details', [])
  .directive('eventDetails', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'event-details.html'
    };
});

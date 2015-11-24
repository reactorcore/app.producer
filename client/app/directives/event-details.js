angular.module('event-details', [])
  .directive('eventDetails', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/event-details.html'
    };
});

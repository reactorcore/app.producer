angular.module('event-details', [])
  .directive('eventDetails', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: false,
      templateUrl: 'app/directives/event-details.html'
    };
});
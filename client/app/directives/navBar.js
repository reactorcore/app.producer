angular.module('navBar', [])
  .directive('navBar', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: '/app/directives/nav-bar.html'
    };
});

angular.module('nav-bar', [])
  .directive('navBar', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: '/app/directives/nav-bar.html',
      controller: function ($scope) {

      }
    };
});

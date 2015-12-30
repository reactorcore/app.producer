angular.module('navBar', [])
  .directive('navBar', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'app/directives/nav-bar.html',
      controller: function ($scope, $location) {
        $scope.getClass = function (currentPath) {
          return currentPath === $location.path().split('/')[1] ? 'active-nav' : '';
        };
      }
    };
});

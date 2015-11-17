angular.module('alertMessageDirective', [])
  .directive('alertMessage', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: '<div class="alert alert-{{message.kind}} content__input--container" data-ng-show="message.text">{{message.text}}</div>',
      controller: function ($scope, Messages) {
        $scope.message = Messages.message;
      }
    };
});

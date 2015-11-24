angular.module('alertMessageDirective', ['ngMdIcons'])
  .directive('alertMessage', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template:
        ['<div class="alert alert-{{message.kind}} content__input--container" ng-show="message.text">',
        '<div class="alert-message" data="message.text">{{message.text}}</div>',
        '<ng-md-icon icon="close" size="20" class="alert-hide" ng-click="clearMessage()"></ng-md-icon>',
        '</div>'
        ].join(''),
      controller: function ($scope, Messages) {
        $scope.message = Messages.message;
        $scope.clearMessage = Messages.clearMessage;
      }
    };
});

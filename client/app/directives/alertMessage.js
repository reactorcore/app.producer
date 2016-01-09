angular.module('alertMessage', [])
  .directive('alertMessage', ['$timeout', 'Messages', function ($timeout, Messages) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template:
        ['<div class="content__message--container alert alert-{{message.kind}}" ng-show="message.text">',
          '<div class="alert-message" data="message.text">{{message.text}}</div>',
          '<div class="alert-hide" ng-click="clearMessage()"> &#x2573;</div>',
        '</div>'
        ].join(''),
      controller: function ($scope, Messages) {
        $scope.message = Messages.message;
        $scope.clearMessage = Messages.clearMessage;
      },
      link: function (scope){
        scope.$watch('message', function() {
          $timeout(function() {
            Messages.clearMessage();
          }, 3000);
        }, true);
      }
    };
}]);

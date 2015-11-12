angular.module('producer.events')
  .directive('alertMessage', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: '<div class="alert alert-success" data-ng-show="message.text">{{message.text}}</div>',
      controller: function ($scope, Messages) {
        $scope.message = Messages.message;

      },
      link: function ($scope, $element, $attrs) {
      }
    };
});


// 
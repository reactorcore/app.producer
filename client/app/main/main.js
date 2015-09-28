angular.module('producer.main', [])

.controller('mainController', function ($scope, Template) {
  $scope.template = {role: '', event: '', description: ''};
  $scope.submitTemplate = function() {
    $scope.buttonClicked = true;
    Template.submitTemplate($scope.template);
  }
});

angular.module('producer.main', [])

.controller('mainController', function ($scope, Template) {
  $scope.template = {role: '', event: '', description: ''};
  $scope.submitTemplate = function() {
    console.log("Template: ", $scope.template)
    Template.submitTemplate($scope.template);
  }
});

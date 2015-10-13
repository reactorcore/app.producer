angular.module('producer.main', [])

.controller('mainController', function ($scope, $http, Template) {
  $scope.template = {role: '', event: '', description: ''};
  
  $scope.submitTemplate = function() {
    console.log("Template: ", $scope.template)
    Template.submitTemplate($scope.template);
  };

  $scope.tags = [];

  $scope.loadTags = function($query) {
    return Template.eventsList($query);
  };
});

angular.module('producer.main', [])

.controller('mainController', function ($scope, $http, Template) {
  $scope.template = {role: '', event: '', description: ''};

  $scope.submitTemplate = function() {
    $scope.template.event = $scope.tags.reduce(function(eventList, currEvent) {
      return eventList+= currEvent.abbreviation;
    }, '');
    var template = {
      role: $scope.template.role,
      event: $scope.template.event,
      description: $scope.template.description
    };
    console.log(template);
    Template.submitTemplate(template);
  };

  $scope.tags = [];

  $scope.loadTags = function($query) {
    return Template.eventsList($query);
  };
});

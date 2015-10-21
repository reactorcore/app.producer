angular.module('producer.main', [])

.controller('mainController', function ($scope, Template, Roles) {
  $scope.template = {title: '', role: '', event: '', description: ''};
  $scope.roles = [];
  $scope.submitTemplate = function() {
    $scope.template.event = $scope.tags.reduce(function(eventList, currEvent) {
      return eventList+= currEvent.abbreviation;
    }, '');
    console.log($scope.template);
    // Template.submitTemplate($scope.template);
  };

  $scope.tags = [];

  $scope.loadTags = function($query) {
    return Template.eventsList($query);
  };

  // Set up autocomplete for Roles Input
  $(function() {
    $(".roles-input").autocomplete({
      source: $scope.roles,
      select: function(event, ui){
        $scope.template.role = ui.item.value;
      }
    });
  });

  // Fetch existing roles from Asana
  Roles.getRoles(function(roles){
    roles.forEach(function(role){
      $scope.roles.push(role.name);
    });
  });

});

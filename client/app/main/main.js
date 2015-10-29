angular.module('producer.main', [])

.controller('mainController', function ($scope, Template, Roles, Events) {
  $scope.template = {title: '', role: '', event: '', description: ''};
  $scope.roles = [];
  $scope.tags = [];

  var submitSuccess = function(response) {
    $scope.messages = 'Your form has been sent!';
    console.log(' ---- RESPONSE DATA ---- : ', response, '------------------------------');
  };

  var submitError = function(response) {
    $scope.messages = 'Sorry, there was an error submitting your form. Please submit again.';
    console.log('error: ', response);
  };
  
  // submits template in correct format
  $scope.submitTemplate = function() {
    $scope.template.event = $scope.tags.reduce(function(eventList, currEvent) {
      return eventList+= currEvent.abbreviation;
    }, '');
    Template.submitTemplate($scope.template).then(submitSuccess, submitError); 
  };


  // load event tags based on user query
  $scope.loadTags = function($query) {
    return Events.eventsList($query);
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

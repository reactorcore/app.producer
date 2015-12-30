angular.module('producer.templates', ['ui.select','ngSanitize','alertMessage'])

.controller('templatesController', function ($scope, Template, Roles, Events, Messages) {
  //TODO: hacky way to not carry over message
  Messages.clearMessage();
  $scope.template = {title: '', role: null, event: '', description: ''};
  $scope.tags = [];
  $scope.roles = [];
  $scope.events = [];

  // Loads roles
  var loadRoles = function() {
    return Roles.getRoles()
      .then(function(roles){
        // $scope.roles = roles;
        // blank roles with ids keep appearing...
        $scope.roles = roles.filter(function(r){return r.name !== ''});
      });
  };
  loadRoles();

  // Loads events/tags
  var loadTags = function() {
    return Events.getEvents()
      .then(function(eventsObj) {
        $scope.events = eventsObj.data;
      });
  };
  loadTags();

  // Change style border
  $scope.checkInput = function(name) {
    var el = document.getElementById('template__' + name);
    var red = "4px solid red"
    var blue = "4px solid rgba(000, 113, 206, 0.2)"
    if(name === 'tags') {
      var el = document.getElementById('template__tags').childNodes[0].childNodes[0];
      el.style.border = !$scope.tags ? red : blue;
    } else {
      el.style.border = !$scope.template[name] ? red : blue;
    }
  };

  // Submits template in correct format
  $scope.submitTemplate = function() {
    $scope.template.event = $scope.tags.reduce(function(eventList, currEvent) {
      return eventList+= currEvent.abbreviation;
    }, '');
    //temporarily sends first role: autocomplete/$scope.template.role can handle multiple
    $scope.template.role = $scope.template.role[0].name;
    Template.submitTemplate($scope.template).then(submitSuccess, submitError);
    console.log($scope.tags.selected);
  };

  var submitSuccess = function(response) {
    Messages.setMessage('Your form has been sent!', 'success');
  };

  var submitError = function(response) {
    if ((400 <= response.status) && (response.status < 500)) {
      Messages.setMessage('Sorry, there was an error submitting your form. Please submit again.', 'error');
    } else {
      Messages.setMessage(response.data, 'error');
    }
  };
});

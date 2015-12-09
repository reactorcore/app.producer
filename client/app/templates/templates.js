angular.module('producer.templates', ['ui.select','ngSanitize','alertMessageDirective'])

.controller('templatesController', function ($scope, Template, Roles, Events, Messages) {
  $scope.template = {title: '', role: null, event: '', description: ''};
  $scope.tags = [];
  $scope.roles = [];
  $scope.events = [];

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

  // Submits template in correct format
  $scope.submitTemplate = function() {
    $scope.template.event = $scope.tags.reduce(function(eventList, currEvent) {
<<<<<<< HEAD
      return eventList+= currEvent.eventKey;
=======
      return eventList+= currEvent.abbreviation;
>>>>>>> directive functional, custom styling has been moved to the styles.css page
    }, '');
    $scope.template.role = $scope.template.role[0].name;
    Template.submitTemplate($scope.template).then(submitSuccess, submitError);
    console.log($scope.tags.selected);
  };

  // Loads events/tags off $scope
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

    if(name === 'tags') {
      var el = document.getElementById('template__tags').childNodes[0].childNodes[0];
      if(!$scope.tags) {
        el.style.border = "4px solid red";
      } else {
        el.style.border = "4px solid rgba(000, 113, 206, 0.2)";
      }
    } else {
      if(!$scope.template[name]) {
        el.style.border = "4px solid red";
      } else {
        el.style.border = "4px solid rgba(000, 113, 206, 0.2)";
      }
    }
  };

  var loadRoles = function() {
    return Roles.getRoles()
      .then(function(roles){
        $scope.roles = roles.filter(function(r){return r.name!==''});
      });
  };
  loadRoles();

});

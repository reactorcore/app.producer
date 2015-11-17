angular.module('producer.templates', [])

.controller('templatesController', function ($scope, Template, Roles, Events) {
  $scope.template = {title: '', role: '', event: '', description: ''};
  $scope.roles = [];
  $scope.tags = [];

  var submitSuccess = function(response) {
    $scope.messages = 'Your form has been sent!';
    setTimeout(function(){
      $scope.messages = null;
      $scope.$apply();
    },3000);
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

  $scope.loadTags = function($query) {
    return Events.getEvents().then(function(resp) {
      var events = resp.data;
      return events.filter(function(event) {
        return event.text.toLowerCase().indexOf($query.toLowerCase()) !== -1;
      });
    });
  };

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
  }

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
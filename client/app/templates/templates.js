angular.module('producer.templates', ['alertMessageDirective', 'ngMaterial', 'ngAria', 'ngAnimate'])

.controller('templatesController', function ($scope, Template, Roles, Events, Messages) {
  $scope.template = {title: '', role: null, event: '', description: ''};
  $scope.roles = [];
  $scope.tags = [];
  $scope.searchText = '';
  $scope.searchTextChange = searchTextChange;
  $scope.filteredSearches = [];
  $scope.filterRolesBySearch = filterRolesBySearch;
  $scope.selectedRoleChange = selectedRoleChange;
  $scope.roleValidation = roleValidation;
  var events;

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
      return eventList+= currEvent.abbreviation;
    }, '');
    Template.submitTemplate($scope.template).then(submitSuccess, submitError);
  };

  // Loads events/tags off $scope
  var loadTags = function() {
    return Events.getEvents()
      .then(function(eventsObj) {
        events = eventsObj.data;
      });
  };

  // Return filtered events/tags per query
  var eventsFilter = function($query) {
    return events.filter(function(event) {
      return event.text.toLowerCase().indexOf($query.toLowerCase()) !== -1;
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
  };

  // If events exists return filtered events/tags,
  // if not, load events/tags and return filtered
  $scope.filterTags = function($query) {
    return events ? eventsFilter($query) :
      loadTags().then(function() {
        return eventsFilter($query);
      });
  };

  // Fetch existing roles from Asana
  Roles.getRoles(function(roles){
    roles.forEach(function(role){
      $scope.roles.push(role.name);
      $scope.filteredSearches = $scope.roles;
    });
    console.log('roles loaded: ', $scope.roles);
  });

  // Make form invalid if search text is invalid
  function searchTextChange() {
    $scope.searchText = $scope.searchText || '';
    $scope.template.role = $scope.searchText;
    $scope.templateForm.$invalid = ($scope.roles.indexOf($scope.template.role) < 0);
    console.log('invalid? ', $scope.templateForm.$invalid);
  }

  // Filter roles by user input
  function filterRolesBySearch() {
    $scope.searchText = $scope.searchText || '';
    return $scope.filteredSearches = $scope.roles.filter(function(role) {
      return role.toLowerCase().indexOf($scope.searchText.toLowerCase()) >= 0;
    });
  }

  function selectedRoleChange() {
    console.log('selected role changed');
    console.log('role is: ', $scope.template.role);
    $scope.templateForm.$invalid = ($scope.roles.indexOf($scope.template.role) < 0);
    console.log('invalid? ', $scope.templateForm.$invalid);
  }

  function roleValidation() {
    if (!$scope.template.role) { return false; }

    var found = false;
    $scope.roles.forEach(function(role) {
      if (role.toLowerCase() === $scope.template.role.toLowerCase()) {
        found === true;
      }
    });
    return found;
  }

});

angular.module('producer.templates', ['ui.select','ngSanitize','alertMessage'])

.controller('templatesController', function ($scope, Template, Roles, Events, Procedures, Messages) {
  //TODO: hacky way to not carry over message
  Messages.clearMessage();
  $scope.template = {title: '', role: null, event: '', description: ''};
  $scope.roles = [];
  $scope.events = [];
  $scope.selectedEvents = [];
  $scope.procedures = [];
  $scope.selectedProcedure = [{text: '', originalText:''}];
  $scope.updatingProcedure = false;

  // Reset selectedProcedure if user deletes selection to prevent null errors
  $scope.$watch(function() {
    return $scope.selectedProcedure;
  }, function() {
    if ($scope.selectedProcedure === null || $scope.selectedProcedure === undefined) {
      $scope.selectedProcedure = [{text: '', originalText:''}];
    }
  }, true);

  // Watch procedure text for changes
  $scope.$watch(function() {
    if ($scope.selectedProcedure[0]) {
      return $scope.selectedProcedure[0].text;
    }
  }, function(oldText, newText) {
    // prevents triggering on first $digets loop and rendering message on page initialization
    if (oldText !== newText) {
      if ($scope.selectedProcedure[0]) {
        if ($scope.selectedProcedure[0].text !== $scope.selectedProcedure[0].originalText) {
          // trigger notification that they'll be updating the procedure
          Messages.setMessage('Procedure text has changed - you will be updating this procedure.', 'success');
          $scope.updatingProcedure = true;
        } else {
          Messages.clearMessage();
          $scope.updatingProcedure = false;
        }
      }
    }
  });

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

  // Loads events
  var loadEvents = function() {
    return Events.getEvents()
      .then(function(eventsObj) {
        $scope.events = eventsObj.data;
      });
  };
  loadEvents();

  // Loads procedures
  var loadProcedures = function() {
    return Procedures.getProcedures()
      .then(function(proceduresObj) {
        $scope.procedures = proceduresObj.data.map(function(p) {
          p.originalTitle = p.title;
          p.originalText = p.text;
          return p;
        });
      });
  };
  loadProcedures();

  // Change style border
  // $scope.checkInput = function(name) {
  //   var el = document.getElementById('template__' + name);
  //   var red = "4px solid red"
  //   var blue = "4px solid rgba(000, 113, 206, 0.2)"
  //   if(name === 'tags') {
  //     var el = document.getElementById('template__tags').childNodes[0].childNodes[0];
  //     el.style.border = !$scope.tags ? red : blue;
  //   } else {
  //     el.style.border = !$scope.template[name] ? red : blue;
  //   }
  // };

  // Submits template in correct format
  $scope.submitTemplate = function() {
    console.log($scope.selectedEvents);
    $scope.template.event = $scope.selectedEvents.reduce(function(eventList, currEvent) {
      return eventList += currEvent.eventName || currEvent.eventKey;
    }, '');
    //temporarily sends only first role even though autocomplete can handle multiple
    $scope.template.role = $scope.template.role[0].name;
    $scope.template.title = $scope.selectedProcedure[0].title;
    $scope.template.description = $scope.selectedProcedure[0].text;
    if ($scope.updatingProcedure) {
      // make new obj without originalTitle and originalText k/v pairs
      var updatedProcedure = {
        $$hashKey: $scope.selectedProcedure[0].$$hashKey,
        DateAdded: $scope.selectedProcedure[0].DateAdded,
        id: $scope.selectedProcedure[0].id,
        text: $scope.selectedProcedure[0].text,
        title: $scope.selectedProcedure[0].title
      };
      Procedures.updateProcedure(updatedProcedure).then(function(){console.log('success!');}, function(){console.log('fail')});
    }
    Template.submitTemplate($scope.template).then(submitSuccess, submitError);
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

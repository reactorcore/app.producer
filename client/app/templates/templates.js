angular.module('producer.templates', ['ui.select','ngSanitize','alertMessage'])

.controller('templatesController', function ($scope, Template, Roles, Events, Procedures, Messages) {
  //TODO: hacky way to not carry over message
  Messages.clearMessage();
  $scope.template = {role: null, event: ''};
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
      .then(function(response){
        // $scope.roles = roles;
        // blank roles with ids keep appearing...
        $scope.roles = response.data.filter(function(r){return r.name !== ''});
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

  // Submits template in correct format
  $scope.submitTemplate = function() {
    $scope.template.event = $scope.selectedEvents.reduce(function(eventList, currEvent) {
      // only use eventKey of Choreographer events; ignore Melody events for now
      return currEvent.eventKey ? eventList += currEvent.eventKey : eventList;
    }, '');
    //temporarily sends only first role even though autocomplete can handle multiple
    $scope.template.roleID = $scope.template.role[0].id;
    $scope.template.title = $scope.selectedProcedure[0].title;
    $scope.template.procedure = $scope.selectedProcedure[0].text;
    if ($scope.updatingProcedure) {
      // make new obj without originalTitle and originalText k/v pairs
      var updatedProcedure = {
        $$hashKey: $scope.selectedProcedure[0].$$hashKey,
        DateAdded: $scope.selectedProcedure[0].DateAdded,
        id: $scope.selectedProcedure[0].id,
        text: $scope.selectedProcedure[0].text,
        title: $scope.selectedProcedure[0].title
      };
      //Submit procedure and if successful, submit template
      Procedures.updateProcedure(updatedProcedure).then(function() {
        Template.submitTemplate($scope.template).then(submitSuccess, submitError);
      }, submitError);
    } else {
      Template.submitTemplate($scope.template).then(submitSuccess, submitError);
    }
  };

  var submitSuccess = function(response) {
    if ($scope.updatingProcedure) {
      Messages.setMessage('Your template was submitted successfully and your procedure was updated!', 'success');
      $scope.updatingProcedure = false;
    } else {
      Messages.setMessage('Your template was submitted successfully!', 'success');
    }
  };

  var submitError = function(response) {
    if ((400 <= response.status) && (response.status < 500)) {
      Messages.setMessage('Sorry, there was an error submitting your form. Please submit again.', 'error');
    } else {
      Messages.setMessage(response.data, 'error');
    }
  };
});

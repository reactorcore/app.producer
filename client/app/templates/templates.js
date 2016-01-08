angular.module('producer.templates', ['ui.select','ngSanitize','alertMessage'])

.controller('templatesController', function ($scope, Template, Roles, Events, Procedures, Messages) {
  //TODO: hacky way to not carry over message
  Messages.clearMessage();
  $scope.template = {title: '', role: null, event: '', procedure: ''};
  $scope.roles = [];
  $scope.events = [];
  $scope.selectedEvents = [];
  $scope.procedures = [];
  $scope.noEdit = false;

  $scope.getClass = function (procedure) {
    if(procedure === {} || $scope.selected === undefined) {
      return '';
    }
    return Hilighter.hilight(procedure.title, $scope.selected.title);
  };

  $scope.clearProcedure = function() {
    $scope.template.title = '';
    $scope.template.procedure = '';
    $scope.noEdit = false;
  }

  $scope.setMaster = function(procedure) {
    $scope.template.title = procedure.title;
    $scope.template.procedure = procedure.text;
    $scope.noEdit = true;
    Messages.clearMessage();
  };

  // Loads roles
  var loadRoles = function() {
    return Roles.getRoles()
      .then(function(response){
        // $scope.roles = roles;
        // blank roles with ids keep appearing...
        $scope.roles = response.data.filter(function(role){return role.name !== ''});
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

    // if no existing procedure was selected, make a new one
    if (!$scope.noEdit) {
      var procedure = {title: $scope.template.title, text: $scope.template.procedure};
      //Submit procedure and if successful, submit template
      Procedures.updateProcedure(procedure).then(function() {
        Template.submitTemplate($scope.template).then(submitSuccess, submitError);
      }, submitError);
    } else {
      Template.submitTemplate($scope.template).then(submitSuccess, submitError);
    }
  };

  var resetTemplate = function() {
    document.querySelector('.main__content--container').scrollTop = 0;
    document.querySelector("form[name='templateForm']").querySelector('input').focus();
    Array.prototype.slice.call(document.querySelectorAll('.content__input--field'))
      .forEach(function(field){
        field.value='';
      });
    setTimeout(function() {
      Array.prototype.slice.call(document.querySelectorAll('.ui-select-match-close'))
        .forEach(function(Xclose){
          Xclose.dispatchEvent(new Event('click'));
        });
    });
  };

  var submitSuccess = function(response) {
    resetTemplate();
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

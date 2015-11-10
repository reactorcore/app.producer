angular.module('producer.services', [])

.factory('Template', function ($http) {
  // This service is responsible for posting templates through the api
  // If data ever needs to be retrieved from Asana, it will be done through this service 
  return {
    submitTemplate: function(template){
      return $http({
        method: 'POST',
        url: 'templates',
        data: template
      });
    }
  };
})



.factory('Events', function ($http) {
  return {
    getEvents: function() {
      return $http({
        method: 'GET',
        // cache: true,
        url: 'events'
      });
    },

    submitEvent: function(event) {
      return $http({
        method: 'POST',
        url: 'events',
        data: event
      });
    },

    deleteEvent: function(event) {
      return $http({
        method: 'DELETE',
        url: 'events/' + event.title,
      });
    }
  };
})

.factory('Procedures', function ($http) {
  return {
    getProcedures: function() {
      return $http({
        method: 'GET',
        // cache: true,
        url: 'procedures'
      });
    },

    submitProcedure: function(procedure) {
      return $http({
        method: 'POST',
        url: 'procedures',
        data: procedure
      });
    },

    deleteProcedure: function(procedure) {
      return $http({
        method: 'DELETE',
        url: 'procedures/' + procedure.title,
      });
    }
  };
})

.factory('Roles', function ($http) {
  return {
    getRoles: function(callback){
      $http({
        method: 'Get',
        url: 'roles',
      })
      .then(function(resp){
        console.log("ROLES: ", resp.data);
        callback(resp.data.data);
      });
    }
  };
})

.factory('SuccessMessages', function ($http) {

  var messages = {
    SUBMIT_PROCEDURE_SUCCESS: 'Your procedure was created!',
    SUBMIT_EVENTS_SUCCESS: 'Your event was created!',
    DELETE_PROCEDURE_SUCCESS: 'Procedure Deleted.',
    DELETE_EVENT_SUCCESS: 'Event Deleted.'
  };

  return {
    submitSuccess: function (response, message) {

    }
  };
})

.factory('ErrorMessages', function ($http) {

  var messages = {
    PROCEDURE_ERROR: 'Sorry, there was an error submitting your form. Please submit again.',
    EVENTS_ERROR: 'something else'
  };

  return {
    submitError: function (response, messageKind) {

    }
  }
})
angular.module('producer.services', [])

.factory('Template', function ($http) {
  // This service is responsible for posting templates through the api
  // If data ever needs to be retrieved from Asana, it will be done through this service
  return {
    submitTemplate: function(template){
      console.log('template is: ', template);
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
        callback(resp.data.data);
      });
    }
  };
})

.factory('Messages', function ($timeout) {

  return {

    message: {
      text: null,
      kind: null
    },

    setMessage: function (text, kind) {
      this.message.text = text;
      this.message.kind = kind;
    },

    clearMessage: function() {
      this.message.text = '';
    }

  };
})

.factory('Soundboard', function ($http) {

  return {

    triggerEvent: function (event) {
      return $http({
        method: 'POST',
        url: 'soundboard/' + event.eventKey,
        data: event
      });
    },

    getTemplate: function (event) {
      return $http({
        method: 'GET',
        url: 'soundboard/' + event.eventKey,
      });
    },

    formatTemplateData: function (templates) {
      // TODO: decide exactly what information we need from the template for Soundboard.
      // there is a lot of info here, but what is most relevant?
      return _.map(templates, function (template) {
        return _.pick(template,
          'name',
          'notes',
          'assignee',
          'assignments',
          'assignee_status',
          'workspace',
          'created_at',
          'subtasks',
          'followers',
          'follow_ups',
          'tags');
      });
    }
  };
})

.factory('RedirectInterceptor', function ($location) {
  return {
    response: function (response) {
      if(response.status === 401) {
        $location.replace('login');
      } else {
        return response;
      }
    }
  };
})

.factory('RedirectInterceptor', function ($location) {
  return {
    response: function (response) {
      if(response.status === 401) {
        $location.replace('login');
      }
      return response;
    }
  };
})

.factory('Auth', function ($http, $cookies) {

  return {

    isAuthenticated: function () {

      // The real authentication is handled in the server
      // and through http-only cookies.
      // The purpose here is  to provide basic control so
      // the user doesn't see empty views when not logged in

      //TODO: refactor to just use document.cookie instead of
      // bringing in an entire module
      // var sessionCookie = document.cookie.split(';').split(':')[1];

      return $cookies.get('session') === "true" ? true : false;
    }
  };
});

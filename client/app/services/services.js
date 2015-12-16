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
      return $http({
        method: 'Get',
        url: 'roles',
      })
      .then(function(resp){
        return resp.data.data;
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
      return _.map(templates, function (template) {
        return template.name;
      });
    }
  };
})

.factory('RedirectInterceptor', function ($q, $location) {
  return {
    responseError: function (rejection) {
      if(rejection.status === 401) {
        $location.path('login');
      }
      return $q.reject(rejection);
    }
  };
})

.factory('Auth', function ($http, $cookies) {

  return {
    isAuthenticated: function () {
      return $cookies.get('session') === "true" ? true : false;
    }
  };
});

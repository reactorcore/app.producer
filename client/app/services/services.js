angular.module('producer.services', [])

.factory('Template', function ($http) {
  // This service is responsible for posting templates through the api
  // If data ever needs to be retrieved from Asana, it will be done through this service 
  return {
    submitTemplate: function(template){
      return $http({
        method: 'POST',
        url: '/templates',
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
        cache: true,
        url: '/events'
      });
    },

    submitEvent: function(event) {
      return $http({
        method: 'POST',
        url: '/events',
        data: event
      })
      .then(function(resp) {
        console.log(resp);
      });
    }
  };
})

.factory('Roles', function ($http) {
  return {
    getRoles: function(callback){
      $http({
        method: 'Get',
        url: '/roles',
      })
      .then(function(resp){
        console.log("ROLES: ", resp.data);
        callback(resp.data.data);
      });
    }
  };
})

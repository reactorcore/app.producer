angular.module('producer.services', [])

.factory('Template', function ($http) {
  // This service is responsible for posting templates through the api
  // If data ever needs to be retrieved from Asana, it will be done through this service 
  return {
    submitTemplate: function(template){
      $http({
        method: 'POST',
        url: '/templates',
        data: template
      })
      .then(function successCallback(resp){
        console.log(' ---- RESPONSE DATA ---- : ', resp, '------------------------------');
        return resp.data;
      }, function errorCallback(resp) {
        console.log('error: ', resp)
      });
    },

    eventsList: function($query) {
      return $http({
        method: 'GET',
        url: '/events'
      })
      .then(function(resp) {
        console.log(resp);
        var events = resp.data;
        return events.filter(function(event) {
          return event.text.toLowerCase().indexOf($query.toLowerCase()) !== -1;
        });
      });
    }
  };
})

.factory('Roles', function ($http) {
  return {
    getRoles: function(callback){
      $http({
        method: 'GET',
        url: '/roles',
      })
      .then(function(resp){
        console.log("ROLES: ", resp.data);
        callback(resp.data.data);
      });
    }
  };
});
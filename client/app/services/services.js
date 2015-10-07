angular.module('producer.services', [])

.factory('Template', function ($http) {
  // This service is responsible for posting templates through the api
  // If data ever needs to be retrieved from Asana, it will be done through this service 
  return {
    submitTemplate: function(template){
      $http({
        method: 'Post',
        url: '/templates',
        data: template
      })
      .then(function(resp){
        console.log(" ---- RESPONSE DATA ---- : ", resp.data);
        return resp.data;
      });
    }
  };
});
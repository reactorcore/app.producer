angular.module('producer.services', [])

.factory('Template', function ($http) {
  // This service is responsible for posting templates through the api
  // If data ever needs to be retrieved from Asana, it will be done through this service 
  return {
    submitTemplate: function(template){
      $http({
        method: 'Post',
        url: '/api/templates/postTemplate',
        data: template
      })
      .then(function(resp){
        console.log(" ---- RESPONSE DATA ---- : ", resp.data);
        return resp.data;
      });
    }
  };
})

.factory('Auth', function ($http, $location, $window) {
  // 
  // THIS FACTORY IS NOT BEING USED FOR THE FIRST ITERATION OF PRODUCER
  //

  // This service is responsible for authenticating users
  // We are currently not using this service, as authentication will com later
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'auth.producer'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('auth.producer');
  };

  var signout = function () {
    $window.localStorage.removeItem('auth.producer');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});

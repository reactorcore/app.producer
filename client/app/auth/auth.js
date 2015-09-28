
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('producer.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        console.log(" ---- TOKEN ---- : ", token);
        $window.localStorage.setItem('auth.producer', token);
        $location.path('/main');
      })
      .catch(function (error) {
        $scope.message = "Invalid Username or Password";
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('auth.producer', token);
        $location.path('/main');
      })
      .catch(function (error) {
        $scope.message = "Username Already Taken";
        console.error(error);
      });
  };

  $scope.logout = function() {
    $window.localStorage.removeItem('auth.producer');
    $location.path('/signin');
  }
});

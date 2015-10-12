angular.module('producer', [
  'producer.services',
  'producer.main',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'app/main/main.html',
      controller: 'mainController'
    })
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'mainController'
    })
})

.run(function ($rootScope, $location) {
});

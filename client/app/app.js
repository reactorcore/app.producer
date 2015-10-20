angular.module('producer', [
  'producer.services',
  'producer.main',
  'producer.events',
  'ui.router',
  'ngTagsInput'
])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'mainController'
    })
    .state('events', {
      url: '/events',
      templateUrl: 'app/events/events.html',
      controller: 'eventsController'
    })

  $urlRouterProvider.otherwise('/');

})
.run(function ($rootScope, $location) {
});

angular.module('producer', [
  'producer.services',
  'producer.templates',
  'producer.events',
  'ui.router',
  'ngTagsInput'
])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('templates', {
      url: '/',
      templateUrl: 'app/templates/templates.html',
      controller: 'templatesController'
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

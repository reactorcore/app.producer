angular.module('producer', [
  'producer.services',
  'producer.templates',
  'producer.events',
  'producer.procedures',
  'ui.router',
  'ngTagsInput'
])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('templates', {
      url: '/templates',
      templateUrl: 'app/templates/templates.html',
      controller: 'templatesController'
    })
    .state('events', {
      url: '/events',
      templateUrl: 'app/events/events.html',
      controller: 'eventsController'
    })
    .state('procedures', {
      url: '/procedures',
      templateUrl: 'app/procedures/procedures.html',
      controller: "proceduresController"
    })

  $urlRouterProvider.otherwise('/templates');

})
.run(function ($rootScope, $location) {
});

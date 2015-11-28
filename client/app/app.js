angular.module('producer', [
  'producer.services',
  'producer.templates',
  'producer.events',
  'producer.procedures',
  'producer.soundboard',
  'producer.login',
  'ui.router',
  'ngTagsInput',
  'angular-cron',
  'alertMessageDirective',
  'event-details',
  'producerAutocompleteDirective'
])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'loginController'
    })
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
    .state('soundboard', {
      url: '/soundboard',
      templateUrl: 'app/soundboard/soundboard.html',
      controller: 'soundboardController'
    });

  $urlRouterProvider.otherwise('/templates');

})
.run(function ($rootScope, $location) {
});

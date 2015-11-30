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
  'ngCookies',
  'alertMessageDirective',
  'event-details',
  'producerAutocompleteDirective'
])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'loginController',
      authenticate: false
    })
    .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'homeController',
      authenticate: true
    })
    .state('templates', {
      url: '/templates',
      templateUrl: 'app/templates/templates.html',
      controller: 'templatesController',
      authenticate: true
    })
    .state('events', {
      url: '/events',
      templateUrl: 'app/events/events.html',
      controller: 'eventsController',
      authenticate: true
    })
    .state('procedures', {
      url: '/procedures',
      templateUrl: 'app/procedures/procedures.html',
      controller: "proceduresController",
      authenticate: true
    })
    .state('soundboard', {
      url: '/soundboard',
      templateUrl: 'app/soundboard/soundboard.html',
      controller: 'soundboardController',
      authenticate: true
    });

  $urlRouterProvider.otherwise('/templates');

})
.run(function ($rootScope, $location, $state, Authentication) {
  $rootScope.$on('$stateChangeStart',
  function (event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !Authentication.isAuthenticated()) {
      $state.transitionTo('login');
      event.preventDefault();
    }
  });
});

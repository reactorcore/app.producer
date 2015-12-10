angular.module('producer', [
  'producer.services',
  'producer.templates',
  'producer.events',
  'producer.procedures',
  'producer.soundboard',
  'producer.login',
  'ui.router',
  'angular-cron',
  'ngCookies',
  'alertMessageDirective',
  'autoSelectDirective'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'loginController',
      authenticate: false
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

  // Include our custom interceptor to the http Provider
  // This catches status codes from the server, and if 401,
  // will redirect to the login page.
  $httpProvider.interceptors.push('RedirectInterceptor');

})
.run(function ($rootScope, $location, $state, Auth) {
  $rootScope.$on('$stateChangeStart',
  function (event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !Auth.isAuthenticated()) {
      $state.transitionTo('login');
      event.preventDefault();
    }
  });
});

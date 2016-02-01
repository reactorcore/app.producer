angular.module('producer', [
  'producer.services',
  'producer.templates',
  'producer.events',
  'producer.procedures',
  'producer.soundboard',
  'producer.login',
  'producer.directives',
  'ui.router',
  'angular-cron',
  'ngCookies'
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
      authenticate: true,
      permission: 'user'
    })
    .state('events', {
      url: '/events',
      templateUrl: 'app/events/events.html',
      controller: 'eventsController',
      authenticate: true,
      permission: 'user'
    })
    .state('procedures', {
      url: '/procedures',
      templateUrl: 'app/procedures/procedures.html',
      controller: "proceduresController",
      authenticate: true,
      permission: 'user'
    })
    .state('soundboard', {
      url: '/soundboard',
      templateUrl: 'app/soundboard/soundboard.html',
      controller: 'soundboardController',
      authenticate: true,
      permission: 'admin'
    });

  //invoking .otherwise with a callback function prevents an infinite digest loop
  $urlRouterProvider.otherwise( function ($injector) {
    var $state = $injector.get('$state');
    $state.go('templates');
  });

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
    if (toState.permission === 'admin') {
      $state.transitionTo('templates');
      event.preventDefault();
    }
  });
});

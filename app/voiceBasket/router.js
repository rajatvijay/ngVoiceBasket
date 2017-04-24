app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'voiceBasketBaseController',
        templateUrl: '/voiceBasket/base.html',
        title: 'Home',
        resolve: {
          currentSectionTemplate: function () {
            return 'home/homeTemplate.html';
          }
        }
      })
      .when('/raq', {
        controller: 'voiceBasketBaseController',
        templateUrl: '/voiceBasket/base.html',
        title: 'Request a Quote',
        resolve: {
          currentSectionTemplate: function () {
            return 'artistRequest/artistRequestTemplate.html';
          }
        }
      })
      .when('/search', {
        controller: 'voiceBasketBaseController',
        templateUrl: '/voiceBasket/base.html',
        title: 'Search An Artist',
        resolve: {
          currentSectionTemplate: function () {
            return 'artistSearch/artistSearchTemplate.html';
          }
        }
      })
      .when('/login', {
        controller: 'voiceBasketBaseController',
        templateUrl: '/voiceBasket/base.html',
        title: 'Login',
        resolve: {
          currentSectionTemplate: function () {
            return 'login/loginTemplate.html';
          }
        }
      })
      .when('/sign-up', {
        controller: 'voiceBasketBaseController',
        templateUrl: '/voiceBasket/base.html',
        title: 'Sign Up',
        resolve: {
          currentSectionTemplate: function () {
            return 'signUp/signUpTemplate.html';
          }
        }
      })
      .when('/dashboard', {
        controller: 'voiceBasketBaseController',
        templateUrl: '/voiceBasket/base.html',
        title: 'Dashboard',
        resolve: {
          currentSectionTemplate: function () {
            return 'dashboard/dashboardTemplate.html';
          }
        }
      })
    $locationProvider.html5Mode({
      enabled: true
    });
  }
]);

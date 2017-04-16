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
      .when('/book', {
        controller: 'voiceBasketBaseController',
        templateUrl: '/voiceBasket/base.html',
        title: 'Book An Artist',
        resolve: {
          currentSectionTemplate: function () {
            return 'book/bookTemplate.html';
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
    $locationProvider.html5Mode({
      enabled: true
    });
  }
]);

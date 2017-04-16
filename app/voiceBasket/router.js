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
    $locationProvider.html5Mode({
      enabled: true
    });
  }
]);

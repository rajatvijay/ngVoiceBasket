(function () {
  app.controller('headerController', ['$scope', controllerFunction]);

  function controllerFunction($scope) {
    $scope.menu = [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'Voices',
        link: '/'
      },
      {
        name: 'Login',
        link: '/login'
      },
      {
        name: 'Sign Up',
        link: '/sign-up'
      }
    ]
  }
})();
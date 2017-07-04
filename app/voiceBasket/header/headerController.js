(function () {
  app.controller('headerController', ['$scope', 'currentUser', controllerFunction]);

  function controllerFunction($scope, currentUser) {
    $scope.menu = [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'Voices',
        link: '/search'
      }
    ]
    if (!$scope.isLoggedIn) {
      $scope.menu.push(
        {
          name: 'Login',
          link: '/login'
        })
      $scope.menu.push(
        {
          name: 'Sign Up',
          link: '/sign-up'
        }
      )
    } else {
      var user = currentUser.user();
      $scope.menu.push(
        {
          name: user.name,
          link: user.userType == 'artist' ? '/add-audio' : '/dashboard'
        }
      )
    }
  }
})();
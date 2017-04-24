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
      console.log(currentUser.user());
      $scope.menu.push(
        {
          name: currentUser.user().user.name,
          link: '/dashboard'
        })
      console.log($scope.menu);
    }
  }
})();
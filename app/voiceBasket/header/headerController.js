(function () {
  app.controller('headerController', ['$scope', 'currentUser', 'session', '$location', controllerFunction]);

  function controllerFunction($scope, currentUser, session, $location) {
    $scope.callFn = callFn;
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
      $scope.menu.push(
        {
          name: 'Logout',
          link: '#',
          callback: logout
        }
      )
    }

    function logout() {
      session.clear();
      $location.path('/');
    }

    function callFn(link, Fn) {
      if (link === '#') {
        console.log(link, Fn);
        Fn();
      }
    }
  }
})();
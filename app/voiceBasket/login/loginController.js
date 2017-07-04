(function () {
  app.controller('loginController', ['$scope', 'accountService', 'currentUser',
    '$location', 'session', controllerFunction]);

  function controllerFunction($scope, accountService, currentUser, $location, session) {
    $scope.user = {};
    $scope.login = login;

    //==============================//

    function login() {
      accountService.login($scope.user).then(function (response) {
        if (response.status) {
          $scope.showToast('Login Successful', 'top');
          currentUser.setUser(response.result.user);
          currentUser.setToken(response.result.sessionId);
          currentUser.setUserType(response.result.user.userType);
          var path = getNextPageUrl(response.result.user.userType);
          session.purgeList(['next.step']);
          $location.path(path);
        } else {
          $scope.showToast(response.message, 'top');
        }
      }, function (error) {
        console.log(error);
        $scope.showToast('Please try again', 'top');
      });
    }

    function getNextPageUrl(userType) {
      if (userType === 'admin') {
        return '/dashboard';
      } else if (userType === 'artist') {
        // return '/add-audio';
      } else {
        return session.getNextStep() === undefined ? '/dashboard' : session.getNextStep();
      }
    }
  }
})();
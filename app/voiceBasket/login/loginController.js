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
          currentUser.setUser(response.result);
          currentUser.setToken(response.result.sessionId);
          var path = session.getNextStep() === undefined ? '/dashboard' : session.getNextStep();
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
  }
})();
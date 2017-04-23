(function () {
  app.controller('loginController', ['$scope', 'accountService', 'currentUser', '$location', controllerFunction]);

  function controllerFunction($scope, accountService, currentUser, $location) {
    $scope.user = {};
    $scope.login = login;

    //==============================//

    function login() {
      accountService.login($scope.user).then(function (response) {
        if (response.status) {
          $scope.showToast('Login Successful', 'top');
          currentUser.setUser(response.result);
          currentUser.setToken(response.result.sessionId);
          $location.path('/dashboard');
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
(function () {
  app.controller('signUpController', ['$scope', 'accountService', '$location', 'currentUser', controllerFunction]);

  function controllerFunction($scope, accountService, $location, currentUser) {
    $scope.user = {};
    $scope.signUp = signUp;

    //==============================//

    function signUp() {
      accountService.register($scope.user).then(function (response) {
        if(response.status) {
          $scope.showToast('Sign Up successful', 'top');
          currentUser.setUser(response.result);
          currentUser.setToken(response.result.sessionId);
          $location.path('/dashboard')
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
(function () {
  app.controller('signUpController', ['$scope', 'accountService', '$location', 'currentUser', 'session', controllerFunction]);

  function controllerFunction($scope, accountService, $location, currentUser, session) {
    $scope.user = {
      userType: 'user'
    };
    $scope.signUp = signUp;

    //==============================//

    function signUp() {
      accountService.register($scope.user).then(function (response) {
        if(response.status) {
          $scope.showToast('Sign Up successful', 'top');
          currentUser.setUser(response.result.user);
          currentUser.setToken(response.result.sessionId);
          currentUser.setUserType(response.result.user.userType);
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
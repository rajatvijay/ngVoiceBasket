(function () {
  app.controller('signUpController', ['$scope', controllerFunction]);

  function controllerFunction($scope) {
    $scope.user = {};
    $scope.signUp = signUp;

    //==============================//

    // TODO: Needs definition
    function signUp() {
      return;
    }
  }
})();
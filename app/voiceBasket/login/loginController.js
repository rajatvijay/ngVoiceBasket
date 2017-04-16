(function () {
  app.controller('loginController', ['$scope', controllerFunction]);

  function controllerFunction($scope) {
    $scope.user = {};
    $scope.login = login;

    //==============================//

    // TODO: Needs definition
    function login() {
      return;
    }
  }
})();
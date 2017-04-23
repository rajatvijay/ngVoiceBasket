(function () {
  app.controller('dashboardController', ['$scope', 'accountService', controllerFunction]);

  function controllerFunction($scope, accountService) {
    $scope.dashboardData = null;

    //==================================//

    $scope.isLoggedIn ? getDashboardData() : null;

    //==================================//

    function getDashboardData() {
      accountService.getDashboardData().then(function (response) {
        if(response.status) {
          $scope.dashboardData = response.result;
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
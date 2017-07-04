(function () {
  app.controller('dashboardController', ['$scope', 'accountService', controllerFunction]);

  function controllerFunction($scope, accountService) {
    $scope.dashboardData = null;
    $scope.acceptRequest = acceptRequest;
    $scope.rejectRequest = rejectRequest;

    //==================================//

    $scope.isLoggedIn ? getDashboardData() : null;

    //==================================//

    function getDashboardData() {
      accountService.getDashboardData().then(function (response) {
        if(response.status) {
          $scope.dashboardData = accountService.renderRequest(response.result.artistRequest);
        } else {
          $scope.showToast(response.message, 'top');
        }
      }, function (error) {
        console.log(error);
        $scope.showToast('Please try again', 'top');
      });
    }

    function acceptRequest(requestId) {
      console.log(requestId);
    }

    function rejectRequest(requestId) {
      console.log(requestId);
    }
  }
})();
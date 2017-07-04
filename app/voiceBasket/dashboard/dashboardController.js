(function () {
  app.controller('dashboardController', ['$scope', 'accountService', 'currentUser', controllerFunction]);

  function controllerFunction($scope, accountService, currentUser) {
    $scope.dashboardData = null;
    $scope.updateStatus = updateStatus;
    $scope.userType = currentUser.getUserType()

    //==================================//

    $scope.isLoggedIn ? getDashboardData() : null;

    //==================================//

    function getDashboardData() {
      accountService.getDashboardData().then(function (response) {
        if(response.status) {
          $scope.dashboardData = accountService.renderArtistRequests(response.result.artistRequest);
        } else {
          $scope.showToast(response.message, 'top');
        }
      }, function (error) {
        console.log(error);
        $scope.showToast('Please try again', 'top');
      });
    }

    function updateStatus(ev, requestId, user_response) {
      ev.preventDefault();
      var payload = {
        id: requestId,
        user_response: user_response
      }
      accountService.updateRequestStatus(payload).then(function (response) {
        if(response.status) {
          $scope.dashboardData = accountService.renderArtistRequests(response.result.artistRequest);
          $scope.showToast(response.message, 'top');
        }
      }, function (error) {
        $scope.showToast('Please try again later!');
      });
    }
  }
})();
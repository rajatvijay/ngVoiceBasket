app.controller('voiceBasketBaseController', ['$scope', '$mdDialog', '$mdToast', 'currentSectionTemplate',
  function ($scope, $mdToast, $mdDialog, currentSectionTemplate) {

    console.log('voiceBasketBaseController called!');

    // WRAPPER TO AVOID SERVICE DI IN CHILD CONTROLLERS
    $scope.showToast = function (message, position, duration) {

      position = position || 'center-large-content';
      duration = duration || 3000;

      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .position(position)
          .hideDelay(duration)
      );

    };

    // WRAPPER TO AVOID DI IN OTHER CHILD CONTROLLERS
    $scope.showDialog = function (title, content) {

      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title(title)
          .htmlContent(content)
          .ariaLabel(title)
          .ok('Okay')
      );

    };

    $scope.currentTemplate = '/voiceBasket/'.concat(currentSectionTemplate);

  }]);
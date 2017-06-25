(function () {
  app.controller('artistRequestController', ['$scope', 'artistService', controllerFunction]);

  function controllerFunction($scope, artistService) {
    $scope.selectedAudios = artistService.getArtistRequestPayload();
    $scope.request = {
      characters: [],
      artistRequest: $scope.selectedAudios
    };
    $scope.types = [
      'Commercial',
      'Infomercials & Explainer Videos',
      'Corporate Videos & Presentations',
      'Cartoon / Animation Videos',
      'Documentaries',
      'Audio-books',
      'IVR',
    ]
    $scope.range = range;
    $scope.submit = submit;
    $scope.charactersCount = 0;

    //========================================//

    function range(number) {
      return _.range(parseInt(number));
    }

    function submit() {
      console.log($scope.request);
      artistService.submitRequest($scope.request).then(function (response) {
        if (response.status) {
          $scope.showToast('Your request has been received!');
          $location.path('/dashboard');
        } else {
          $scope.showToast('Please try again!');
        }
      }).catch(function (error) {
        $scope.showToast('Please try again!');
      })
    }
  }
})();
(function () {
  app.controller('artistRequestController', ['$scope', 'artistService', controllerFunction]);

  function controllerFunction($scope, artistService) {
    $scope.request = {
      characters: []
    };
    $scope.selectedAudios = artistService.getArtistRequestPayload();
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
    $scope.submit = submit

    //========================================//

    function range(number) {
      return _.range(parseInt(number));
    }

    function submit() {
      $scope.showToast('Your request has been recieved!');
    }
  }
})();
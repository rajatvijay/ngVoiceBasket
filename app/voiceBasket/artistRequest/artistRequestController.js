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
    $scope.submit = submit;
    $scope.charactersCount = 0;

    //========================================//

    function range(number) {
      console.log('Range called!')
      console.log(_.range(parseInt(number)))
      return _.range(parseInt(number));
    }

    function submit() {
      $scope.showToast('Your request has been recieved!');
    }
  }
})();
(function () {
  app.controller('artistSearchController', ['$scope', 'artistService', 'session', '$location', controllerFunction]);

  function controllerFunction($scope, artistService, session, $location) {

    $scope.filters = null;
    $scope.audios = [];
    $scope.selectedFilter = {};
    $scope.selectedAudios = {};
    $scope.goToRAQ = goToRAQ;

    //=======================================//

    var audios;

    getFilters();
    getArtists();

    $scope.$watch('selectedFilter', function (selectedFilters) {
      if (audios) {
        $scope.audios = [];
        $scope.selectedAudios = {};
        audios.forEach(function (audio) {
          _.isMatch(audio.audioClip, selectedFilters) ? $scope.audios.push(audio) : null;
        });
      }
    }, true);

    //========================================//

    function getFilters() {
      artistService.getFilters().then(function (response) {
        if(response.status) {
          $scope.filters = response.result;
        }
      })
    }

    function getArtists() {
      artistService.getArtistList().then(function (response) {
        if(response.status) {
          audios = response.result.artistAudio;
        }
      })
    }

    function goToRAQ() {
      if (Object.keys($scope.selectedAudios).length === 0) {
        $scope.showToast('Please select at-least 1 sample', 'top');
      } else if (Object.keys($scope.selectedAudios).length > 3) {
        $scope.showToast('Can\'t select more than 3 samples', 'top');
      } else {
        artistService.selectedAudios = $scope.selectedAudios;
        artistService.audios = $scope.audios;
        if ($scope.isLoggedIn) {
          $location.path('/raq');
        } else {
          session.setNextStep('/raq');
          $location.path('/login');
        }
      }
    }
  }
})();
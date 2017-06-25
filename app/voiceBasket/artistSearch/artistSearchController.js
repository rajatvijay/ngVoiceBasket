(function () {
  app.controller('artistSearchController', ['$scope', 'artistService', 'session', '$location', '$filter',
    controllerFunction]);

  function controllerFunction($scope, artistService, session, $location, $filter) {

    $scope.filters = null;
    $scope.audios = [];
    $scope.selectedFilter = {};
    $scope.selectedAudios = {};
    $scope.goToRAQ = goToRAQ;
    $scope.renderOptionName = renderOptionName;
    $scope.isDisabled = isDisabled;

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

    var enablingFiltersMap = {
      'gender': 'language',
      'voiceOverType': 'gender',
      'ageRange': 'voiceOverType'
    }

    //========================================//

    function getFilters() {
      artistService.getFilters().then(function (response) {
        if(response.status) {
          $scope.filters = response.result;
          $scope.filtersArray = (function () {
            var ary = [];
            angular.forEach($scope.filters, function (val, key) {
              ary.push({key: key, val: val});
            });
            return ary;
          })();
        }
      })
    }

    function renderOptionName(filterName, val) {
      var filteredValue = $filter(filterName)(val);
      return filteredValue.replace(filteredValue.charAt(0), filteredValue.charAt(0).toLowerCase());
    };

    function getArtists() {
      artistService.getArtistList().then(function (response) {
        if(response.status) {
          audios = response.result.artistAudio;
        }
      })
    }


    function isDisabled(filterName) {
      if(filterName === 'language') {
        return false;
      } else {
        return $scope.selectedFilter[enablingFiltersMap[filterName]] === undefined;
      }
    }

    function goToRAQ() {
      console.log("Inside method");
      console.log($scope.selectedAudios);
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
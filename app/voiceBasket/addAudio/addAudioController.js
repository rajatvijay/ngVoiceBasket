(function () {
  app.controller('addAudioController', ['$scope', 'artistService', '$filter', controllerFunction]);

  function controllerFunction($scope, artistService, $filter) {
    $scope.audio = {};
    $scope.filters = null;
    $scope.renderOptionName = renderOptionName;
    $scope.selectedFilter = {};
    $scope.addAudio = addAudio;

    //========================//

    getFilters();
    var enablingFiltersMap = {
      'gender': 'language',
      'voiceOverType': 'gender',
      'ageRange': 'voiceOverType'
    }

    //========================//

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

    function addAudio(audio) {
      var payload = Object.assign({}, $scope.selectedFilter, $scope.audio)
      artistService.addAudio(payload).then(function (response) {
        if (response.status) {
          $scope.audio = {};
          $scope.showToast(response.message, 'top');
        }
      }, function (error) {
        console.log(error);
      })
    }
  }
})();
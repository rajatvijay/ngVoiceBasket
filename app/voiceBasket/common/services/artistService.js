(function () {
  app.service('artistService', ['api', 'endPoints', serviceFunction]);

  function serviceFunction(api, endPoints) {

    this.selectedAudios = null;

    this.audios = null;

    this.getFilters = function () {
      return api.get(endPoints.filters);
    };

    this.getArtistList = function () {
      return api.get(endPoints.artistList);
    };

    this.submitRequest = function (requestPayload) {
      return api.post(endPoints.submitRequest, {data: requestPayload});
    }

    this.parseSelectedAudios = function () {
      var selectedAudioIds = [];
      angular.forEach(this.selectedAudios, function (acceptanceBoolean, audioId) {
        if (acceptanceBoolean) {
          this.push(parseInt(audioId));
        }
      }, selectedAudioIds);
      return selectedAudioIds;
    }

    this.getArtistRequestPayload = function () {
      var that = this;
      var audioIdList = that.parseSelectedAudios(that.selectedAudios);
      console.log(that.audios);
      return that.audios.filter(function (audio) {
        return audioIdList.indexOf(audio.id) > -1;
      })
    }
  }
})();
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
      return that.audios.filter(function (audio) {
        return audioIdList.indexOf(audio.id) > -1;
      })
    }
  }
})();
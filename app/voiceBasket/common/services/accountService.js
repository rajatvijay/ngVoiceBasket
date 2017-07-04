(function () {
  app.service('accountService', ['api', 'endPoints', serviceFunction]);

  function serviceFunction(api, endPoints) {
    this.register = function (registerPayload) {
      return api.post(endPoints.user, {data: registerPayload});
    }

    this.login = function (loginPayload) {
      return api.put(endPoints.user, {data: loginPayload});
    };

    this.getDashboardData = function () {
      return api.get(endPoints.dashboard);
    };

    // Collects the requests into a single entity
    // Required due to wrong DB structure
    this.renderArtistRequests = function (artistRequests) {
      var artistRequestsId = [];
      var newArtistRequests = {};
      angular.forEach(artistRequests, function (arReq) {
        if (artistRequestsId.indexOf(arReq.id) === -1) {
          this[arReq.id] = arReq;
        } else {
          this[arReq.id]['artistAudio'].concat(arReq['artistAudio']);
        }
      }, newArtistRequests)
      return Object.values(newArtistRequests);
    };
  }
})();
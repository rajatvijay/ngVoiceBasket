(function () {
  app.service('accountService', ['api', 'endPoints', serviceFunction]);

  function serviceFunction(api, endPoints) {
    this.register = function (registerPayload) {
      return api.post(endPoints.user, {data: registerPayload});
    }

    this.login = function (loginPayload) {
      return api.put(endPoints.user, {data: loginPayload});
    };
  }
})();
ng.module('app').provider('api', [function () {

  // declaring like this to avoid minification conflict
  this['$get'] = [
    '$http', 'BASE_URL', 'currentUser',
    function ($http, BASE_URL, currentUser) {

      function camelToSnake(s){
        return s.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
      };

      var api = function (method, url, options) {

        options = ng.isObject(options) ? options : {};

        // Converting JS camel case to
        // Snake case required by python
        angular.forEach(options, function (value, key) {
          var newValue = {};
          angular.forEach(value, function (v, k) {
            this[camelToSnake(k)] = v;
          }, newValue)
          options[key] = newValue;
        });

        // Just to make the code readable
        var apiEndpoint = url;
        options.url = 'http://' + BASE_URL + '/' + apiEndpoint;

        options.method = method;

        options.headers = options.headers || {};

        if(!options.headers.hasOwnProperty('sessionId')) {
          ng.extend(options.headers, {
            'sessionId': currentUser.getAuthToken()
          }) ;
        }

        return $http(options).then(function (res) {

          return res.data;

        }, function (error) {
          console.log('ERROR OCCURRED');
          return error.data;
        });
      };

      ['GET', 'PUT', 'POST', 'DELETE'].forEach(function (method) {
        api[method.toLowerCase()] = function (url, options) {
          return api(method, url, options);
        };
      });

      return api;
    }
  ];
}
]);

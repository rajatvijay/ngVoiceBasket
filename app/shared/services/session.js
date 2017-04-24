ng.module('app').provider('session', [
  function() {
    this['$get'] = [
      'cache',
      function(cache) {
        var auth_token = null ;
        var session = {
          setObject: function(key, object) {
            cache(key, object) ;
          },
          getObject: function(key) {
            return cache(key) ;
          },
          setUser: function(user) {
            cache('auth.user', user) ;
          },
          setToken: function(token) {
            cache('auth.token', token) ;
          },
          user: function() {
            return cache('auth.user') ;
          },
          auth_token: function() {
            return cache('auth.token') ;
          },
          setNextStep: function (path) {
            cache('next.step', path);
          },
          getNextStep: function () {
            return cache('next.step');
          },
          purgeList: function(_cachedItems) {
            angular.forEach(_cachedItems, function (item) {
              cache.remove(item) ;
            }) ;
          },
          clear: function() {
            var cachedItems = ['auth.user', 'auth.token'] ;
            angular.forEach(cachedItems, function (item) {
              cache.remove(item) ;
            }) ;
            return this;
          }
        };
        return session;
      }
    ];
  }
]);

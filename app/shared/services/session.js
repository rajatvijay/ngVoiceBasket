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
          setUserType: function (userType) {
            cache('auth.user.type', userType);
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
          auth_user_type: function () {
            return cache('auth.user.type');
          },
          purgeList: function(_cachedItems) {
            angular.forEach(_cachedItems, function (item) {
              cache.remove(item) ;
            }) ;
          },
          clear: function() {
            var cachedItems = ['auth.user', 'auth.token', 'auth.user.type'] ;
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

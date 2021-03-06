app.service('currentUser',["session", "$rootScope", function (session, $rootScope) {

  this.isLoggedIn = function () { return !!(session.auth_token()); } ;

  this.user = function() {
    return session.user() ;
  };

  this.setUser = function(user) {
    session.setUser(user);
  };

  this.setUserType = function (userType) {
    session.setUserType(userType);
  }

  this.setToken = function (token) {
    session.setToken(token);
  };

  this.getAuthToken = function() {
    return session.auth_token() ;
  };

  this.getUserType = function() {
    return session.auth_user_type() ;
  };

}]) ;

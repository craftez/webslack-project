angular.module("angularfireSlackApp")
.factory("Users", function($firebaseArray, $firebaseObject, FirebaseUrl){
  var ref = new Firebase(FirebaseUrl + 'users');
  var users = $firebaseArray(ref);

  var Users = {
    getProfile: function(uid) {
      return $firebaseObject(ref.child(uid));
    },

    getDisplayName: function(uid) {
      return users.$getRecord(uid).displayName;
    },

    getGravatar: function(uid) {
      return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
    },

    all: users

  };

  return Users;
});

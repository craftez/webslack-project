angular
  .module('angularfireSlackApp')
  .controller('ProfileCtrl', function($state, md5, auth, profile) {
    var vm = this;
    vm.profile = profile;

    vm.updateProfile = function() {
      vm.profile.emailHash = md5.createHash(auth.password.email);
      vm.profile.$save().then(function(){
        $state.go('channels');
      });;
    };
  });

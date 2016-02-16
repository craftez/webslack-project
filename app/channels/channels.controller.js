angular.module('angularfireSlackApp')
  .controller('ChannelsCtrl', function($state, Auth, Users, profile, channels){
    var vm = this;
    vm.profile = profile;
    vm.channels = channels;
    vm.getDisplayName = Users.getDisplayName;
    vm.getGravatar = Users.getGravatar;

    console.log(channels);

    vm.logout = function(){
      Auth.$unauth();
      $state.go('home');
    };

    //vm.newChannel = {
    //  name: ""
    //};

    vm.createChannel = function() {
      vm.channels.$add(vm.newChannel).then(function() {
        vm.newChannel = {
          name: ""
        };
      });
    }
  });

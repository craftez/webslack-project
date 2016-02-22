angular.module('angularfireSlackApp')
  .controller('ChannelsCtrl', function ($state, Auth, Users, profile, channels) {
    var vm = this;
    vm.profile = profile;
    vm.channels = channels;
    vm.users = Users.all;
    vm.getDisplayName = Users.getDisplayName;
    vm.getGravatar = Users.getGravatar;
    Users.setOnline(profile.$id);

    vm.logout = function () {
      vm.profile.online = null;
      vm.profile.$save().then(function () {
        Auth.$unauth();
        $state.go('home');
      });
    };



    vm.createChannel = function () {
      vm.channels.$add(vm.newChannel).then(function (ref) {
        $state.go('channels.message', {channelId: ref.key()});
      });
    };
  });

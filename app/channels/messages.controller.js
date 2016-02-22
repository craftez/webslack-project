angular
  .module('angularfireSlackApp')
  .controller('MessagesCtrl', function (profile, channelName, messages, Users) {
    var vm = this;
    vm.messages = messages;
    vm.channelName = channelName;
    vm.message = '';
    vm.getGravatar = Users.getGravatar;

    vm.sendMessage = function () {
      if (vm.message.length > 0) {
        vm.messages.$add({
          uid: profile.$id,
          body: vm.message,
          timestamp: Firebase.ServerValue.TIMESTAMP
        }).then(function () {
          vm.message = '';
        });
      }
    };
  });

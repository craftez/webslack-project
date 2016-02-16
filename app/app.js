'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('channels');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl',
        controllerAs: 'login',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireAuth().then(function(auth) {
              $state.go("home");
            }, function(error) {

            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl',
        controllerAs: 'login',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireAuth().then(function(auth) {
              $state.go("home");
            }, function(error) {

            });
          }
        }
      })

      .state('channels', {
        url: '/channels',
        controller: 'ChannelsCtrl as canal',
        templateUrl: 'channels/channels.html',
        resolve: {
          channels: function (Channels){
            return Channels.$loaded();
          },
          profile: function ($state, Auth, Users){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function (profile){
                if(profile.displayName){
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error){
              $state.go('home');
            });
          }
        }
      })

      .state('channels.create', {
        url: '/create',
        templateUrl: 'channels/create.html',
        controller: 'ChannelsCtrl as canal'
      })

      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl',
        controllerAs: 'profile',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Auth) {
            return Auth.$requireAuth().catch(function(auth) {
              $state.go("home");
            })
          },
          profile: function(Users, Auth) {
            return Auth.$requireAuth().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }

      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://webslackfire.firebaseio.com/');

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('character_creation', {
      url: '/character_creation',
      templateUrl: '../views/character_creation/character_creation.html',
      controller: '',
      icon: 'fa fa-user',
      display_name: 'Character creation'
    })
    .state('team_building', {
      url: '/team_building',
      templateUrl: '../views/team_building/team_building.html',
      controller: '',
      icon: 'fa fa-users',
      display_name: 'Team building'
    });

  $urlRouterProvider.otherwise('character_creation');

});

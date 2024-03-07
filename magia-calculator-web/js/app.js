const app = angular.module("magia_calculator", ['ui.router', 'ngResource']);
app.run(function($rootScope) {

  // Creates the variables for the API connection
  $rootScope.api_ip = "localhost";
  $rootScope.api_port = "9000";
  $rootScope.api_direction = $rootScope.api_ip + ":" + $rootScope.api_port;
  $rootScope.api_end_point = "http://" + $rootScope.api_direction;

});

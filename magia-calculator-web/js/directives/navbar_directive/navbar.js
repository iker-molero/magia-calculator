app.directive('navbar', function() {

  return {

    restrict: "E",
    templateUrl: "js/directives/navbar_directive/navbar.html",
    controller: function($scope, $rootScope, $state, status_resource) {

      // [Variables]
      // Stores if the navbar is open or closed
      $scope.is_open = false;
      // Gets all the states saved in the app
      $scope.states = $state.get();
      // Filters out all the states
      $scope.states = $scope.states.filter((e) => e.icon);
      // Gets the API direction stored in the $rootScope
      $scope.api_direction = $rootScope.api_direction;
      // Stores the API status
      $scope.api_active = false;

      // [Functions]
      // Toggles the navbar between opened and closed
      $scope.toggle_navbar = function() { $scope.is_open = !$scope.is_open; };

      // Sets the state to the selected page
      $scope.change_page = function(page_name) { $state.go(page_name); };

      // Gets the name of the current page
      $scope.get_current_state = function() { return $state.current.name; };

      // [Intervals]
      // Creates an interval to check the API's status every seconds
      setInterval(function() {

        status_resource.query().$promise.then(() => {

          $scope.api_active = true;

        }).catch((e) => {

          $scope.api_active = false;

        });

      }, 1000);

    },
  };

});

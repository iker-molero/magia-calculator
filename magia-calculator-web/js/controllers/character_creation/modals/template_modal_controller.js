app.controller("template_modal_controller", function($scope, $uibModalInstance, template_characters_resource) {

  // [Variables]
  // Characters list
  $scope.characters_list = [];
  $scope.characters_filtered_list = [];
  // Selected character data
  $scope.selected_character = {};
  // Input values
  // Search value
  $scope.search_value = "";
  // Filter value
  $scope.filter_value = ""

  // [Functions]
  // Close modal without sending data
  $scope.close = function() {
    $uibModalInstance.dismiss();
  }

  // Close modal sending data
  $scope.ok = function() {
    $uibModalInstance.close();
  }

  // Filter the characters list
  $scope.filter_data = function() {
    $scope.characters_filtered_list = $scope.characters_list.filter(function(character) {

      const character_name = character.name.toLowerCase();
      return character_name.includes($scope.search_value.toLowerCase());

    });
  };

  // Select a character from the characters list
  $scope.select_character = function(character) {
    $scope.selected_character = character;
  }

  // [Petitions]
  // Load all the template characters into the web
  template_characters_resource.query().$promise.then((data) => {

    data.sort(function(a, b) {

      // Saves the characters name in lowercase
      const a_name = a.name.toLowerCase();
      const b_name = b.name.toLowerCase();

      // Compares the character names to sort them correctly
      if (a_name > b_name) return 1;
      if (a_name < b_name) return -1;
      return 0;

    });

    $scope.characters_list = data;
    $scope.characters_filtered_list = data;

  }).catch((e) => {

    console.log(e);

  });

});

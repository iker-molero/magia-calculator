function character_creation_controller($scope, $uibModal) {

  // [Variables]
  // Modal control
  $scope.selected_character = {};

  // [Functions]
  // Modal control
  $scope.open_template_modal = function() {
    console.log("Template modal opened");
    const modal_instance = $uibModal.open({
      templateUrl: '../views/character_creation/modals/template_modal.html',
      controller: 'template_modal_controller'
    });

    console.log(modal_instance)

    modal_instance.result.then(function(data) {

      // Called when the modal is returning data 
      console.log(data);

    }, function(reason) {

      // Called when the modal is closed with no data
      console.log("Modal closed with no data")

    });

  }

}

app
  .controller("character_creation_controller", character_creation_controller);

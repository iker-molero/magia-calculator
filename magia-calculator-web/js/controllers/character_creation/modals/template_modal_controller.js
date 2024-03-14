app.controller("template_modal_controller", function($scope, $uibModalInstance) {

  // [Variables]


  // [Functions]
  // Close modal without sending data
  $scope.close = function() {
    $uibModalInstance.dismiss();
  }

  // Close modal sending data
  $scope.ok = function() {
    $uibModalInstance.close("JOSEPH ES UN PUTO CALVO!");
  }

});

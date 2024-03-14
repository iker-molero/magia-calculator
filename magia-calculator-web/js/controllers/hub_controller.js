app.controller("hub_controller", function($scope, template_characters_resource) {

  // [Variables]
  $scope.template_characters_list = [];
  $scope.saved_characters_list = [];

  // [Functions]

  // [Petitions]
  // Load all the template characters into the web
  template_characters_resource.query().$promise.then((data) => {

    $scope.template_characters_list = data;

  }).catch((e) => {

    console.log(e);

  });

});

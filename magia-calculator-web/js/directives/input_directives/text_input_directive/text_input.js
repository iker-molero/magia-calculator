app.directive('text', function() {

  return {

    restrict: "E",
    templateUrl: "js/directives/input_directives/text_input_directive/text_input.html",
    scope: {

      width: "@",
      height: "@",
      placeholder: "@",
      icon: "@",
      value: "=",
      change: "&"

    },
    link: function(scope) {

      scope.filter_data = function() {
        setTimeout(() => {
          scope.change();
        }, 10);

      }

    }

  }

});

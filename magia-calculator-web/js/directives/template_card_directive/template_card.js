app.directive("templateCard", function() {

  return {

    restrict: "E",
    templateUrl: "js/directives/template_card_directive/template_card.html",
    scope: {
      id: "=",
      name: "=",
      attribute: "=",
      startingRarity: "=",
      maxRarity: "=",
      hp: "=",
      atk: "=",
      def: "=",
      disksString: "=",
      selected: "="
    },
    link: function(scope, element) {

      // [Variables]
      scope.image_loaded = false;
      scope.character_image = element.find('img')[0];
      scope.rarity_value = "";
      scope.disks_array = JSON.parse(scope.disksString);

      // [Functions]
      // Creates the rarity values with icons
      scope.get_rarity_value = function() {

        let result = "";
        for (let i = 1; i < (scope.maxRarity + 1); i++) {
          if (i <= scope.startingRarity) result = result + "★";
          else result = result + "☆";
        }

        return result;

      };
      scope.rarity_value = scope.get_rarity_value();

      // [Intervals]
      // Checks if the image is loaded
      const image_checker = setInterval(() => {

        if (scope.character_image.complete && scope.character_image.naturalWidth != 0) {
          scope.image_loaded = true;
          clearInterval(image_checker);
        }

      }, 100);

    },

  };

});

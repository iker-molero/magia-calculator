function status_resource($resource, $rootScope) {

  return ($resource($rootScope.api_end_point, {}, {
    query: { method: "GET" }
  }));

}

function template_characters_resource($resource, $rootScope) {

  return ($resource($rootScope.api_end_point + "/characters/all", {}, {
    query: { method: "GET", isArray: true }
  }));

}

app
  .factory("status_resource", status_resource)
  .factory("template_characters_resource", template_characters_resource);


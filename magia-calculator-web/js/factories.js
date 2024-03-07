function status_resource($resource, $rootScope) {

  return ($resource($rootScope.api_end_point, {}, {
    query: { method: "GET" }
  }));

}

app
  .factory("status_resource", status_resource);

export class GenericDatasource {

  constructor(instanceSettings, $q, backendSrv) {
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.q = $q;
    this.backendSrv = backendSrv;
  }

  // Called once per panel (graph)
  query(options) {
    var target = options.targets[0];
    var params = target.query;

    return this.backendSrv.datasourceRequest({
      url: this.url + '/query/grafana?' + params,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, function(data, cb) {
    
    });
  }

  // Required
  // Used for testing datasource in datasource configuration pange
  testDatasource() {
    return this.backendSrv.datasourceRequest({
      url: this.url + '/pkg/status',
      method: 'GET'
    }).then(response => {
      if (response.status === 200) {
        return { status: "success", message: "Data source is working", title: "Success" };
      }
    });
  }

  mapToTextValue(result) {
    return _.map(result.data, (d, i) => {
      return { text: d, value: i};
    });
  }

}

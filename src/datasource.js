// from stackoverflow 
function QueryStringToJSON(str) {            
    var pairs = str.split('&');
    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        var name = pair[0]
        var value = pair[1]
        if( name.length )
            if (result[name] !== undefined) {
                if (!result[name].push) {
                    result[name] = [result[name]];
                }
            result[name].push(value || '');
            } else {
                result[name] = value || '';
            }
    });
    return( result );
}

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

    var queryObj = QueryStringToJSON(params);

    var suffixes = {
      "d" : 24 * 60 * 60,
      "h" : 60 * 60,
      "m" : 60,
      "s" : 1,
    };

    queryObj.start = options.range.from._d;
    queryObj.end = options.range.to._d;

    var interval = parseInt(options.interval, 10);
    var suffix = options.interval.replace(interval, "");
    var seconds = interval * suffixes[suffix];

    queryObj.time_bucket = seconds;

    params = $.param(queryObj);

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

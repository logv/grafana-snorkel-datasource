'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, GenericDatasource;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  // from stackoverflow
  function QueryStringToJSON(str) {
    var pairs = str.split('&');
    var result = {};
    pairs.forEach(function (pair) {
      pair = pair.split('=');
      var name = pair[0];
      var value = pair[1];
      if (name.length) if (result[name] !== undefined) {
        if (!result[name].push) {
          result[name] = [result[name]];
        }
        result[name].push(value || '');
      } else {
        result[name] = value || '';
      }
    });
    return result;
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('GenericDatasource', GenericDatasource = function () {
        function GenericDatasource(instanceSettings, $q, backendSrv) {
          _classCallCheck(this, GenericDatasource);

          this.type = instanceSettings.type;
          this.url = instanceSettings.url;
          this.name = instanceSettings.name;
          this.q = $q;
          this.backendSrv = backendSrv;
        }

        // Called once per panel (graph)


        _createClass(GenericDatasource, [{
          key: 'query',
          value: function query(options) {
            var target = options.targets[0];
            var params = target.query;

            var queryObj = QueryStringToJSON(params);

            var suffixes = {
              "d": 24 * 60 * 60,
              "h": 60 * 60,
              "m": 60,
              "s": 1
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
            }, function (data, cb) {});
          }
        }, {
          key: 'testDatasource',
          value: function testDatasource() {
            return this.backendSrv.datasourceRequest({
              url: this.url + '/pkg/status',
              method: 'GET'
            }).then(function (response) {
              if (response.status === 200) {
                return { status: "success", message: "Data source is working", title: "Success" };
              }
            });
          }
        }, {
          key: 'mapToTextValue',
          value: function mapToTextValue(result) {
            return _.map(result.data, function (d, i) {
              return { text: d, value: i };
            });
          }
        }]);

        return GenericDatasource;
      }());

      _export('GenericDatasource', GenericDatasource);
    }
  };
});
//# sourceMappingURL=datasource.js.map

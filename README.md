## Simple Snorkel Datasource

## About 

This is a datasource for querying [snorkel](snorkel.superfluous.io) - a small purpose data tool

### Installation

Copy the dist directory to /var/lib/grafana/plugins/snorkel-datasource/, then
restart grafana-server. The new data source should now be available in the
data source type dropdown in the Add Data Source View.

### Usage

To add a new query, copy the URL query parameters from an existing snorkel
query into the QUERY input when adding a new graph. 

For example, if your query is: `snorkel.superfluous.io/query?table=snorkle.queries&view=table&start=-1%20week&end=Now&compare=&max_results=&agg=$avg`, paste `table=snorkle.queries&view=table&start=-1%20week&end=Now&compare=&max_results=&agg=$avg` into the query input

## Status

This plugin is in alpha stages and only supports time series plugins and has
little to no UI for composing queries inside grafana. In the future, the plugin
will support table queries and a grafana query builder.

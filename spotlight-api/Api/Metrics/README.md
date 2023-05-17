# Adding Prometheus Metrics to your API

By default the API is configured to use the [AppMetrics.io](https://www.app-metrics.io/) library to enable the Prometheus endpoint to emit metrics.  Out of the box the API is configured to emit metrics used by all but 2 panels in the [Grafana 2204](https://grafana.com/dashboards/2204) dashboard used for AppMetrics.  Those two panels are in the Health row.  Health metrics are emitted by default on a different endpoint and not formatted for Prometheus.  Samples in this folder demonstrate how to emit health metrics for these panels as well as custom metrics you may wish to add for your specific needs.

To excercise the code, you will need to call the SampleMetrics.Run method in SampleMetrics.cs.

In this directory you will find:

- SampleMetrics.json -- Sample dashboard you can import into Grafana.
- MetricRegistry.cs -- Example how to register custom metrics for Prometheus.
- HealthMetrics.cs -- Example how to emit health metrics used by the panels in the Health Row.
- SampleMetrics.cs -- Sample code to randomly call and set metric values.

### Sample Dashboard for opi-spotlight-api
You can import [SampleMetrics.json](./SampleMetrics.json) into Grafana as a starting point.
![Sample Dashboard](../../.github/images/sample_dashboard.png)
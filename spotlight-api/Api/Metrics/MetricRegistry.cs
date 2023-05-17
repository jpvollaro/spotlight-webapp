using App.Metrics.Counter;
using App.Metrics.Gauge;
using App.Metrics.Histogram;
using App.Metrics.Meter;
using App.Metrics.Timer;

namespace Optum.PaymentIntegrity.SpotlightApi.Api.Metrics
{
    // Custom metrics can be defined here.  Metric types are documented at
    // https://www.app-metrics.io/getting-started/metric-types/
    public static class MetricRegistry
    {
        // health_results is used by the Grafana AppMetrics dashboard (2204) to display a table
        public static GaugeOptions HealthResults => new GaugeOptions
        {
            Name = "health_results"
        };

        // health_score is used by the Grafana AppMetrics dashboard (2204) to display a singlestat
        // Out of the box color thresholds are 0.5, 1:
        //  threshold < 0.5 : red
        //  0.5 >= threshold < 1.0 : orange
        //  threshold >= 1.0 : green
        // Out of the box the mappings for text are:
        //  health_score 0.00 - 0.49: Unhealthy
        //  health_score 0.50 - 0.90: Degraded
        //  health_score 1.00 - 2.00: Healthy
        public static GaugeOptions HealthScore => new GaugeOptions
        {
            Name = "health_score"
        };

        public static CounterOptions CustomCounter => new CounterOptions
        {
            Name = "example_counter"
        };

        public static GaugeOptions CustomGuage => new GaugeOptions
        {
            Name = "example_guage"
        };

        public static HistogramOptions CustomHistogram => new HistogramOptions
        {
            Name = "example_histogram"
        };

        public static MeterOptions CustomMeter => new MeterOptions
        {
            Name = "example_meter"
        };

        public static TimerOptions CustomTimer => new TimerOptions
        {
            Name = "example_timer"
        };
    }
}

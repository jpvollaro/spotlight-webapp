using App.Metrics;
using System;

namespace Optum.PaymentIntegrity.SpotlightApi.Api.Metrics
{
    public static class HealthMetrics
    {
        // This name is predefined in the dashboard and must match
        const string GrafanaHealthCheckName = "health_check_name";

        public static void SetHealthScore(float score)
        {
            Program.Metrics.Measure.Gauge.SetValue(MetricRegistry.HealthScore, score);
        }

        public static void ExampleSetDatabaseAccessHealth(bool canAccess)
        {
            var tags = new MetricTags(new[] { GrafanaHealthCheckName }, new[] { "database_access" });
            Program.Metrics.Measure.Gauge.SetValue(MetricRegistry.HealthResults, tags, canAccess ? 1 : 0);
        }

        public static void ExampleSetRandomHealth()
        {
            var tags = new MetricTags(new[] { GrafanaHealthCheckName }, new[] { "random_health" });
            float value = 1.0f;

            if (DateTime.UtcNow.Second <= 20)
            {
                value = 0.5f;
            }

            if (DateTime.UtcNow.Second >= 40)
            {
                value = 0;
            }

            Program.Metrics.Measure.Gauge.SetValue(MetricRegistry.HealthResults, tags, value);
        }
    }
}

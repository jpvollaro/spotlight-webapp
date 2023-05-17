using System;
using System.Threading;

namespace Optum.PaymentIntegrity.SpotlightApi.Api.Metrics
{
    // This class is just a sample to demonstrate how to use the AppMetrics API to
    // set custom Prometheus metrics for your API.
    //
    // To test/run metrics call SampleMetrics.Run() from your main program thread.
    public static class SampleMetrics
    {
        private static Thread thread = null;

        public static void ThreadProc()
        {
            Random random = new Random();
            while (true)
            {
                // Set the health metrics
                HealthMetrics.SetHealthScore(random.Next(0, 101) / 100.0f);
                HealthMetrics.ExampleSetDatabaseAccessHealth(random.Next(0, 2) == 1);
                HealthMetrics.ExampleSetRandomHealth();

                // Randomly increment or decrement the counter
                if (random.Next(0, 3) < 2)
                {
                    Program.Metrics.Measure.Counter.Increment(Metrics.MetricRegistry.CustomCounter);
                }
                else
                {
                    Program.Metrics.Measure.Counter.Decrement(Metrics.MetricRegistry.CustomCounter);
                }

                Program.Metrics.Measure.Gauge.SetValue(Metrics.MetricRegistry.CustomGuage, random.Next(0, 100));
                Program.Metrics.Measure.Histogram.Update(Metrics.MetricRegistry.CustomHistogram, random.Next(0, 100), "sample1");
                Program.Metrics.Measure.Histogram.Update(Metrics.MetricRegistry.CustomHistogram, random.Next(0, 100), "sample2");
                Program.Metrics.Measure.Meter.Mark(Metrics.MetricRegistry.CustomMeter, random.Next(1, 5).ToString());

                // Randomly reset the counter
                if (random.Next(0, 40) == 20)
                {
                    Program.Metrics.Provider.Counter.Instance(Metrics.MetricRegistry.CustomCounter).Reset();
                }

                // We will set the performance timer with the sleep
                using (Program.Metrics.Measure.Timer.Time(Metrics.MetricRegistry.CustomTimer))
                {
                    // Sleep between 30 seconds and 3 minutes
                    Thread.Sleep(random.Next(30, 180) * 1000);
                }
            }
        }
        public static void Run()
        {
            if (thread == null)
            {
                thread = new Thread(new ThreadStart(ThreadProc));
                thread.Start();
            }
        }
    }
}



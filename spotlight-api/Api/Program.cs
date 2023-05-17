namespace Optum.PaymentIntegrity.SpotlightApi.Api
{
    using App.Metrics;
    using App.Metrics.AspNetCore;
    using App.Metrics.Formatters.Prometheus;
    using App.Metrics.Formatters;
    using Microsoft.AspNetCore;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Logging;
    using NLog.Web;
    using System;
    using App.Metrics.AspNetCore.Health;

    public class Program
    {
        public static IMetricsRoot Metrics { get; set; }

        public static void Main(string[] args)
        {
            var logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
            try
            {
                logger.Debug("init main");

                Metrics = AppMetrics.CreateDefaultBuilder()
                .OutputMetrics.AsPrometheusPlainText()
                .Build();

                CreateWebHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                //NLog: catch setup errors
                logger.Error(ex, "Stopped program because of exception");
                throw;
            }
            finally
            {
                // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
                NLog.LogManager.Shutdown();
            }


        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureMetrics(Metrics)
                .UseMetricsWebTracking()
                .UseMetrics()
                .UseMetricsEndpoints(options =>
                {
                    options.MetricsTextEndpointOutputFormatter = Metrics.OutputMetricsFormatters.GetType<MetricsPrometheusTextOutputFormatter>();
                })
                .UseHealth()
                .UseHealthEndpoints()
                .UseStartup<Startup>()
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
                })
                .UseNLog()  // NLog: setup NLog for Dependency injection
                .UseKestrel(o => o.AllowSynchronousIO = true);
    }
}

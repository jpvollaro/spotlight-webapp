using NLog;
using NLog.Config;
using NLog.Layouts;
using NLog.Targets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Optum.PaymentIntegrity.Api
{
    public static class Logconfig
    {
        public static ILogger ConfigureNLog()
        {
            // Step 1. Create configuration object 
            var config = new LoggingConfiguration();

            var layout = new JsonLayout()
            {
                Attributes =
                {
                    new JsonAttribute("timestampUtc", "${date:yyyy-MM-ddTHH\\:mm\\:ss.fffffffzzz}"),
                    new JsonAttribute("level", "${level}"),
                    new JsonAttribute("thread", "${thread}"),
                    new JsonAttribute("logger", "${logger}"),
                    new JsonAttribute("message","${message}"),
                    new JsonAttribute("exception","${exception:format=toString,Data}"),
                }

            };

            var fileTarget = new FileTarget("jsonFile2")
            {
                FileName = "C:\\temp\\nlog-json2-${shortdate}.log",
                Layout = layout,
            };
            config.AddTarget(fileTarget);


            // Step 3. Define rules
            config.AddRuleForAllLevels(fileTarget); // only errors to file

            // Step 4. Activate the configuration
            LogManager.Configuration = config;
            return LogManager.GetCurrentClassLogger();
        }
    }
}

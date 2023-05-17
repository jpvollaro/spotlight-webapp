using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace Optum.PaymentIntegrity.SpotlightApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelloWorldController : ControllerBase
    {
        private readonly ILogger<HelloWorldController> logger;

        public HelloWorldController(ILogger<HelloWorldController> logger)
        {
            this.logger = logger;
        }

        /// <summary>
        /// Get this instance.
        /// </summary>
        /// <returns>The get.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(string), 200)]
        public IActionResult Get()
        {
            var num = new Random().Next(10).ToString();

            logger.LogInformation("Testing the HelloWorldController: {num}", num);
            return Ok("Hello World random num: " + num);
        }

        /// <summary>
        /// Post the specified value testing documentation.
        /// </summary>
        /// <returns>The post.</returns>
        /// <param name="value">Value.</param>
        [HttpPost]
        [ProducesResponseType(typeof(object), 200)]
        public IActionResult Post([FromBody] string value)
        {
            logger.LogInformation("Testing the HelloWorldController Post: {value}", value);
            throw new Exception("Test Exception");

        }
    }
}
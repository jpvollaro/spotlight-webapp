using Microsoft.AspNetCore.Mvc;
using Optum.PaymentIntegrity.SpotlightApi.Api.Controllers;
using Unit.Test.Mocks;
using Xunit;
using System.Linq;
using GlobalErrorHandling.CustomExceptionMiddleware;

namespace Unit.Test
{
    public class HelloWorldControllerTests
    {
        [Fact]
        public void Get_Success()
        {
            //Arrange
            var controller = new HelloWorldController(new MockLogger<HelloWorldController>());
            string expected = "Hello World";

            //Act
            var response = controller.Get();

            //Assert
            var result = Assert.IsType<OkObjectResult>(response);
            var resultValue = Assert.IsType<string>(result.Value);

            Assert.Contains(expected, resultValue);
        }

        [Fact]
        public void Post_Success()
        {
            //Arrange
            var controller = new HelloWorldController(new MockLogger<HelloWorldController>());
            //Act
            var response = Record.Exception(() => controller.Post("Testing"));

            //Assert
            Assert.Equal("Test Exception", response.Message);
        }
    }
}
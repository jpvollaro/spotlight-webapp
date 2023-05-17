using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace GlobalErrorHandling.CustomExceptionMiddleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate Next;
        private readonly ILogger<ExceptionMiddleware> Logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            Next = next ?? throw new ArgumentNullException(nameof(next));
            Logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await Next(httpContext);
            }
            catch (Exception ex)
            {
                var stackTrace = new StackTrace(ex, true);
                var method = stackTrace.GetFrames()[0].GetMethod();

                var message = ex is TimeoutException
                 ? $"Timeout occured while calling  {method} Details : {ex.Message}"
                 : $"Error occured while calling  {method} Details : {ex.Message}";

                Logger.LogError(ex, message);
                await HandleExceptionAsync(httpContext, ex);
            }
        }
        //middleware will trigger the catch block and call the HandleExceptionAsync method
        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            string message;
            var exceptionType = exception.GetType();

            if (exceptionType == typeof(UnauthorizedAccessException))
            {
                message = exception.Message;
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            }
            else if (exceptionType == typeof(NotImplementedException))
            {
                message = exception.Message;
                context.Response.StatusCode = StatusCodes.Status501NotImplemented;
            }
            else
            {
                message = exception.Message;
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            }
            var error = JsonConvert.SerializeObject(new Error() { Code = context.Response.StatusCode.ToString(), Message = message });
            return context.Response.WriteAsync(error);
        }
    }

    public static class ExceptionMiddlewareExtensions
    {
        public static void UseGlobalException(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }

    public class Error
    {
        public string Code { get; set; }
        public string Message { get; set; }
    }

}

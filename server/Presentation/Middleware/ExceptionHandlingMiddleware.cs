using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
namespace server.Presentation.Middleware
{
     public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;
        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context); // Пропускаем запрос дальше
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Произошла ошибка"); // Логируем ошибку
                await HandleExceptionAsync(context, ex); // Отправляем ответ пользователю
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var response = context.Response;
            response.ContentType = "application/json";
            var statusCode = ex switch
            {
                ArgumentNullException => (int)HttpStatusCode.BadRequest,
                KeyNotFoundException => (int)HttpStatusCode.NotFound,
                _ => (int)HttpStatusCode.InternalServerError
            };
            response.StatusCode = statusCode;
            var errorResponse = new
            {
                StatusCode = statusCode,
                Message =  ex.Message,
                Detail =  ex.StackTrace
            };
            return response.WriteAsync(JsonSerializer.Serialize(errorResponse));
        }
    }
}

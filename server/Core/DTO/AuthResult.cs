


namespace server.Core.DTO
{
    public class AuthResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string Token { get; set; } // сюда запишем JWT-токен, если операция успешна
        public UserDto User { get; set; }
        
    }
}
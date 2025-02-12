

namespace server.Core.DTO
{
    public class RegistrationRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } // пароль приходит в открытом виде, его нужно будет хешировать
    }
}

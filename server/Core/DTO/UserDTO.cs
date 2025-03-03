using server.Core.Models;

namespace server.Core.DTO
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public string Email { get; set; }

        public Role role{ get; set; }

        public string? AvatarUrl { get; set; }
    }
}

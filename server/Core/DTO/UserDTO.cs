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

        public string? Bio { get; set; }

        public string? Location { get; set; }

        public DateTime? DataOfBirth { get; set; }
        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public ICollection<Follows> Followers { get; set; } = new List<Follows>();
        public ICollection<Follows> Followings { get; set; } = new List<Follows>();
    }
}

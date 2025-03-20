using System.Text.Json.Serialization;
using server.Core.DTO;

namespace server.Core.Models
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string AvatarUrl {  get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

        public DateTime RegisteredAt { get; set; }
  
        public ICollection<Post>? Posts { get; set; } = new List<Post>();

        public string? Bio { get; set; }

        public string? Location { get; set; }

        public DateTime? DataOfBirth { get; set; }
       
        public Role Role { get; set; }

        public int RoleId  { get; set; }
       
        public ICollection<Follows> Followers { get; set; } = new List<Follows>();
     
        public ICollection<Follows> Followings { get; set; } = new List<Follows>();

       
    }
}

using server.Core.Models;

namespace server.Core.DTO
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public UserDto? User { get; set; }
        public DateTime CreatedDate { get; set; }
        public int PostId { get; set; }
        public string? AvatarUrl { get; set; }
    }
} 
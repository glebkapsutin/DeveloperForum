using server.Core.DTO;
using server.Core.Models;

namespace server.Core.Models
{
    public class Comment
    {
        public int Id { get; set; } 
        
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }

        

        public DateTime CreatedDate { get; set; }
        public User? User { get; set; }
    }
}

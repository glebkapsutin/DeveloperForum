using System.ComponentModel.DataAnnotations.Schema;

namespace server.Core.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
        
        public ICollection<Comment>? Comments { get; set; } = new List<Comment>();
      
        public ICollection<Likes>? Likes{get ;set; } = new List<Likes>();

        public User? User { get; set; }

        public int UserId { get; set; }


    }
}

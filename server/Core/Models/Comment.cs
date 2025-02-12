namespace server.Core.Models
{
    public class Comment
    {
        public int Id { get; set; } 
        
        public Post Post { get; set; }

        public int PostId { get; set; }
        public string Description { get; set; }

        public string Author { get; set; }

        public DateTime CreatedDate { get; set; }


    }
}

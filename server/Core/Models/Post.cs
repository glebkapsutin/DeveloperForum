namespace server.Core.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }

        public DateTime? CreatedDate { get; set; }

        public ICollection<Comment>? Comments { get; set; } = new List<Comment>();

        public ICollection<Likes> Likes = new List<Likes>();

        public User? User { get; set; }

        public int UserId { get; set; }


    }
}

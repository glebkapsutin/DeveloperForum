namespace server.Core.Models
{
    public class Likes
    {
        public int Id {  get; set; }
        
        public User User { get; set; }

        public int UserId  { get; set; }

        public Post Post { get; set; }

        public int PostId { get; set; }



    }
}

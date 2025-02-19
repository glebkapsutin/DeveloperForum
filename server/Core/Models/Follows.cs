namespace server.Core.Models
{
    public class Follows
    {
        public int Id { get; set; }

        public User Follower { get; set; }

        public int FollowerId { get; set; }

        public User Following { get; set; }

        public int FollowingId { get; set; }
    }
}

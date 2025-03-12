namespace server.Core.DTO
{
    public class PostDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? Author { get; set; }
        public string? AvatarUrl { get; set; }
        public int CommentsCount { get; set; }
        public int LikesCount { get; set; }
    }
}

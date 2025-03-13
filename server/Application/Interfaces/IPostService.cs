using server.Core.DTO;
using server.Core.Models;


namespace server.Application.Interfaces
{
    public interface IPostService
    {
        public Task<IEnumerable<PostDTO>> GetAllPosts(int currentUserId);

        public Task<PostDTO> GetDetailsPost(int id, int currentUserId);

        public Task<PostDTO> CreatePost(Post post);

        public Task<Post> ModifyPost(Post post);

        public Task<Post> RemovePost(int id);

    }
}

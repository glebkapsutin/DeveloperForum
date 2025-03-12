using server.Core.DTO;
using server.Core.Models;


namespace server.Application.Interfaces
{
    public interface IPostService
    {
        public Task<IEnumerable<Post>> GetAllPosts();

        public Task<Post> GetDetailsPost(int id);

        public Task<PostDTO> CreatePost(Post post);

        public Task<Post> ModifyPost(Post post);

        public Task<Post> RemovePost(int id);

    }
}

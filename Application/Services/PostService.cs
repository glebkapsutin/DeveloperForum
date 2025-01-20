using DevelopForum.Application.Interfaces;
using DevelopForum.Core.Models;

namespace DevelopForum.Application.Services
{
    public class PostService : IPostService
    {
        public PostService() 
        {
            
        }

        public Task<Post> CreatePost(Post post)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Post>> GetAllPosts()
        {
            throw new NotImplementedException();
        }

        public Task<Post> GetDetailsPost(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Post> ModifyPost(Post post)
        {
            throw new NotImplementedException();
        }

        public Task<Post> RemovePost(int id)
        {
            throw new NotImplementedException();
        }
    }
}

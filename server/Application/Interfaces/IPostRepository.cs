using server.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace server.Application.Interfaces
{
    public interface IPostRepository
    {
        public Task<IEnumerable<Post>> GetPosts();

        public Task<Post> GetPostById(int id);

        public Task<Post> AddPost(Post post);
        
        public Task UpdatePost(Post post);

        public Task DeletePost(int id);



       
    }
}

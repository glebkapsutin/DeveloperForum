using DevelopForum.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace DevelopForum.Application.Interfaces
{
    public interface IPostRepository
    {
        public Task<IEnumerable<Post>> GetPosts();

        public Task<Post> GetPostById(int id);

        public Task AddPost(Post post);
        
        public Task UpdatePost(Post post);

        public Task DeletePost(int id);



       
    }
}

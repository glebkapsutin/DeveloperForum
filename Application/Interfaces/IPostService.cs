using DevelopForum.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace DevelopForum.Application.Interfaces
{
    public interface IPostService
    {
        public Task<IEnumerable<Post>> GetAllPosts();

        public Task<Post> GetDetailsPost(int id);

        public Task<Post> CreatePost(Post post);

        public Task<Post> ModifyPost(Post post);

        public Task<Post> RemovePost(int id);

    }
}

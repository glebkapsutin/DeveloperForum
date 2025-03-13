using server.Application.Interfaces;
using server.Core.Models;
using server.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace server.Infrastructure.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly DevelopForumDbContext _context;
        public PostRepository(DevelopForumDbContext context)
        { 
            _context = context;
        }

        public async Task AddPost(Post post)
        {
           await _context.Posts.AddAsync(post);
           await _context.SaveChangesAsync();   
        }

        public async Task DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
        }

        public async Task<Post?> GetPostById(int id)
        {
           return await _context.Posts
                .Include(p => p.User)
                .Include(p => p.Comments)
                .Include(p => p.Likes)
                .Include(p => p.User.Role)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Post>> GetPosts()
        {
            return await _context.Posts
                .Include(p => p.User)
                .Include(p => p.Comments)
                .Include(p => p.Likes)
                .Include(p => p.User.Role)
                .OrderByDescending(p => p.CreatedDate)
                .ToListAsync();
        }

        public async Task UpdatePost(Post post)
        {
           _context.Entry(post).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}

using server.Application.Interfaces;
using server.Core.Models;
using server.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace server.Infrastructure.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DevelopForumDbContext _context;
        public CommentRepository(DevelopForumDbContext context)
        {
            _context = context;
        }
        public async Task AddComment(Comment comment)
        {
            // Find the user first
            var user = await _context.Users.FindAsync(comment.UserId);
            if (user != null)
            {
                comment.User = user;
            }

            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            // Reload the comment with related data
           
        }

        public async Task DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
        }

        public async Task<Comment?> GetCommentById(int id)
        {
            return await _context.Comments
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Comment>> GetComments()
        {
            return await _context.Comments
                .Include(c => c.User)
                .ToListAsync();
        }

        public async Task UpdateComment(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}

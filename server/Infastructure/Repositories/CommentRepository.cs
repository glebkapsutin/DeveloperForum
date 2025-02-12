using server.Application.Interfaces;
using server.Core.Models;
using server.Infastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace server.Infastructure.Repositories
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
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
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
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Comment>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task UpdateComment(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}

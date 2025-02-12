using server.Core.Models;

namespace server.Application.Interfaces
{
    public interface ICommentRepository
    {
        public Task<IEnumerable<Comment>> GetComments();

        public Task<Comment> GetCommentById(int id);

        public Task AddComment(Comment comment);

        public Task UpdateComment(Comment comment);

        public Task DeleteComment(int id);




    }
}

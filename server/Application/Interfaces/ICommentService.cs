using server.Core.Models;

namespace server.Application.Interfaces
{
    public interface ICommentService
    {
        public Task<IEnumerable<Comment>> GetAllComments();

        public Task<Comment> GetDetailsComment(int id);

        public Task<Comment> CreateComment(Comment comment);

        public Task<Comment> ModifyComment(Comment comment);

        public Task<Comment> RemoveComment(int id);

    }
}

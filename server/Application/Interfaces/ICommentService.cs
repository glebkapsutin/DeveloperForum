using server.Core.Models;
using server.Core.DTO;

namespace server.Application.Interfaces
{
    public interface ICommentService
    {
        public Task<IEnumerable<CommentDTO>> GetAllComments();

        public Task<CommentDTO> GetDetailsComment(int id);

        public Task<CommentDTO> CreateComment(Comment comment);

        public Task<CommentDTO> ModifyComment(Comment comment);

        public Task<CommentDTO> RemoveComment(int id);

    }
}

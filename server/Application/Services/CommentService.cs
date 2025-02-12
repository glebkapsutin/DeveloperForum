using server.Application.Interfaces;
using server.Core.Models;

namespace server.Application.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }
        public async Task<Comment> CreateComment(Comment comment)
        {
            if (comment != null)
            {
                await _commentRepository.AddComment(comment);
                return comment;
            }
            throw new ArgumentNullException(nameof(comment), "Category cannot be null.");
        }

        public async Task<IEnumerable<Comment>> GetAllComments()
        {
            return await _commentRepository.GetComments();
        }

        public async Task<Comment> GetDetailsComment(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(id), "Comment ID must be greater than zero.");
            }
            return await _commentRepository.GetCommentById(id);
        }

        public async Task<Comment> ModifyComment(Comment comment)
        {
            if (comment == null)
            {
                throw new ArgumentNullException("Post  was not found.", nameof(comment));
            }
            await _commentRepository.UpdateComment(comment);
            return comment;
        }

        public async Task<Comment> RemoveComment(int id)
        {
            if (id <= 0)
                throw new ArgumentOutOfRangeException(nameof(id), "Comment ID must be greater than zero.");
            var comment = await _commentRepository.GetCommentById(id);
            if (comment == null)
                throw new KeyNotFoundException($"Comment with ID {id} was not found.");


            await _commentRepository.DeleteComment(id);
            return comment;
        }
    }
}

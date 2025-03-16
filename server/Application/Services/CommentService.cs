using server.Application.Interfaces;
using server.Core.Models;
using server.Core.DTO;

namespace server.Application.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
      
        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
            
        }
        public async Task<CommentDTO> CreateComment(Comment comment)
        {   
            if (comment == null)
                throw new ArgumentNullException(nameof(comment), "Comment cannot be null.");
            
            

            if (string.IsNullOrEmpty(comment.Description))
                throw new ArgumentException("Description is required.", nameof(comment.Description));

           
           
            
            comment.CreatedDate = DateTime.UtcNow;

            await _commentRepository.AddComment(comment);
            
            // Convert to DTO
            return new CommentDTO
            {
                Id = comment.Id,
                Description = comment.Description,
                UserId = comment.UserId,
                User = comment.User != null ? new UserDto
                {
                    Id = comment.User.Id,
                    Username = comment.User.UserName,
                    Email = comment.User.Email,
                    role = comment.User.Role,
                    AvatarUrl = comment.User.AvatarUrl
                } : null,
                CreatedDate = comment.CreatedDate,
                PostId = comment.PostId,
                AvatarUrl = comment.User?.AvatarUrl
            };
        }

        public async Task<IEnumerable<CommentDTO>> GetAllComments()
        {
            var comments = await _commentRepository.GetComments();
            return comments.Select(comment => new CommentDTO
            {
                Id = comment.Id,
                Description = comment.Description,
                UserId = comment.UserId,
                User = comment.User != null ? new UserDto
                {
                    Id = comment.User.Id,
                    Username = comment.User.UserName,
                    Email = comment.User.Email,
                    role = comment.User.Role,
                    AvatarUrl = comment.User.AvatarUrl
                } : null,
                CreatedDate = comment.CreatedDate,
                PostId = comment.PostId,
                AvatarUrl = comment.User?.AvatarUrl
            });
        } 

        public async Task<CommentDTO> GetDetailsComment(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(id), "Comment ID must be greater than zero.");
            }
            var comment = await _commentRepository.GetCommentById(id);
            return new CommentDTO
            {
                Id = comment.Id,
                Description = comment.Description,
                UserId = comment.UserId,
                User = comment.User != null ? new UserDto
                {
                    Id = comment.User.Id,
                    Username = comment.User.UserName,
                    Email = comment.User.Email,
                    role = comment.User.Role,
                    AvatarUrl = comment.User.AvatarUrl
                } : null,
                CreatedDate = comment.CreatedDate,
                PostId = comment.PostId,
                AvatarUrl = comment.User?.AvatarUrl
            };
        }

        public async Task<CommentDTO> ModifyComment(Comment comment)
        {
            if (comment == null)
            {
                throw new ArgumentNullException("Comment was not found.", nameof(comment));
            }
            await _commentRepository.UpdateComment(comment);
            return new CommentDTO
            {
                Id = comment.Id,
                Description = comment.Description,
                UserId = comment.UserId,
                User = comment.User != null ? new UserDto
                {
                    Id = comment.User.Id,
                    Username = comment.User.UserName,
                    Email = comment.User.Email,
                    role = comment.User.Role,
                    AvatarUrl = comment.User.AvatarUrl
                } : null,
                CreatedDate = comment.CreatedDate,
                PostId = comment.PostId,
                AvatarUrl = comment.User?.AvatarUrl
            };
        }

        public async Task<CommentDTO> RemoveComment(int id)
        {
            if (id <= 0)
                throw new ArgumentOutOfRangeException(nameof(id), "Comment ID must be greater than zero.");
            var comment = await _commentRepository.GetCommentById(id);
            if (comment == null)
                throw new KeyNotFoundException($"Comment with ID {id} was not found.");

            await _commentRepository.DeleteComment(id);
            return new CommentDTO
            {
                Id = comment.Id,
                Description = comment.Description,
                UserId = comment.UserId,
                User = comment.User != null ? new UserDto
                {
                    Id = comment.User.Id,
                    Username = comment.User.UserName,
                    Email = comment.User.Email,
                    role = comment.User.Role,
                    AvatarUrl = comment.User.AvatarUrl
                } : null,
                CreatedDate = comment.CreatedDate,
                PostId = comment.PostId,
                AvatarUrl = comment.User?.AvatarUrl
            };
        }
    }
}

using server.Application.Interfaces;
using server.Core.Models;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration.UserSecrets;
using server.Core.DTO;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace server.Application.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _repository;

        private readonly IUserRepository _userRepository;

        private readonly ILogger<PostService> _logger;

        public PostService(IPostRepository repository, ILogger<PostService> logger, IUserRepository userRepository)
        {
            _repository = repository;
            _logger = logger;
            _userRepository = userRepository;
        }

        public async Task<PostDTO> CreatePost(Post post)
        {
            if (string.IsNullOrWhiteSpace(post.Title) || string.IsNullOrWhiteSpace(post.Description))
            {
                throw new ArgumentException("Все поля обязательны");
            }

            try
            {
                // Загружаем пользователя перед созданием поста
                var user = await _userRepository.GetUserByIdAsync(post.UserId);
                if (user == null)
                {
                    throw new KeyNotFoundException("Пользователь не найден");
                }

                post.User = user;
                post.CreatedDate = DateTime.UtcNow;
                
                var createdPost = await _repository.AddPost(post);
                if (createdPost == null)
                {
                    throw new KeyNotFoundException("Пост не был создан");
                }

                // Перезагружаем пост с полными данными
                createdPost = await _repository.GetPostById(createdPost.Id);
                if (createdPost == null)
                {
                    throw new KeyNotFoundException("Не удалось загрузить созданный пост");
                }

                return new PostDTO
                {
                    Id = createdPost.Id,
                    Title = createdPost.Title,
                    Description = createdPost.Description,
                    CreatedDate = createdPost.CreatedDate,
                    AuthorId = createdPost.User.Id,
                    avatarUrl = createdPost.User.AvatarUrl,
                    CommentsCount = createdPost.Comments?.Count ?? 0,
                    LikesCount = createdPost.Likes?.Count ?? 0,
                    Name = createdPost.User.UserName,
                    IsLikedByUser = false
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error creating Post with title: {post.Title}");
                throw new Exception("Ошибка при создании поста", ex);
            }
        }


        public async Task<IEnumerable<PostDTO>> GetAllPosts(int currentUserId)
        {
            var posts = await _repository.GetPosts();

            return posts.Select(p => new PostDTO
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                CreatedDate = p.CreatedDate,
                AuthorId = p.User.Id,
                avatarUrl = p.User.AvatarUrl,
                CommentsCount = p.Comments?.Count ?? 0,
                LikesCount = p.Likes?.Count ?? 0,
                Name = p.User.UserName,
                IsLikedByUser = p.Likes?.Any(l => l.UserId == currentUserId) ?? false
            });
        }

        public async Task<PostDTO> GetDetailsPost(int id, int currentUserId)
        {
            var post = await _repository.GetPostById(id);
            if (post == null)
            {
                throw new KeyNotFoundException($"Post with ID {id} was not found.");
            }

            return new PostDTO
            {
                Id = post.Id,
                Title = post.Title,
                Description = post.Description,
                CreatedDate = post.CreatedDate,
                AuthorId = post.User.Id,
                avatarUrl = post.User.AvatarUrl,
                CommentsCount = post.Comments?.Count ?? 0,
                LikesCount = post.Likes?.Count ?? 0,
                Name = post.User.UserName,
                IsLikedByUser = post.Likes?.Any(l => l.UserId == currentUserId) ?? false
            };
        }

        public async Task<Post> ModifyPost(Post post)
        {
            if (post == null)
            {
                throw new ArgumentNullException("Post  was not found.", nameof(post));
            }
            CheckTitlePost(post);
            try
            {
                await _repository.UpdatePost(post);
                return post;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating Post with ID: {post.Id}", post.Id);
                throw new Exception("Error Update Post In Service", ex);
            }

        }

        public async Task<Post> RemovePost(int id)
        {
            var post = await _repository.GetPostById(id);
            if (post == null)
            {
                throw new KeyNotFoundException($"Post with ID {id} was not found.");
            }

            CheckIdPost(id);
            try
            {
                await _repository.DeletePost(id);
                return post;
                

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error removing Post with ID: {id}", id);
                throw new Exception("Error Remove Post In Service", ex);
            }
        }
        private int CheckTitlePost(Post post)
        {

            if (string.IsNullOrEmpty(post.Title))
            {
                throw new ArgumentException("Post title cannot be null or whitespace.",nameof(post.Title));
            }
            return 0;
        }
        private int CheckIdPost(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException(nameof(id), "id cannot be null");
            }
            return 0;
        }

     


    }
}

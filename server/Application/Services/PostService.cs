using server.Application.Interfaces;
using server.Core.Models;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace server.Application.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _repository;

        private readonly IUserRepository _userRepository;

        private readonly ILogger<PostService> _logger;

        public PostService(IPostRepository repository, ILogger<PostService> logger,IUserRepository userRepository)
        {
            _repository = repository;
            _logger = logger;
            _userRepository = userRepository;
        }

        public async Task<Post> CreatePost(Post post)
        {   
            if (string.IsNullOrWhiteSpace(post.Title) || string.IsNullOrWhiteSpace(post.Description))
            {
                throw new ArgumentException("Все поля обязательны");
            }

            try
            {   
                await _repository.AddPost(post);

                // Загружаем автора поста по `UserId`
                post.User = await _userRepository.GetUserByIdAsync(post.UserId);
                
                return post;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error creating Post with title: {post.Title}");
                throw new Exception("Ошибка при создании поста", ex);
            }
        }


        public async Task<IEnumerable<Post>> GetAllPosts()
        {
            try { return await _repository.GetPosts(); }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all posts.");
                throw new Exception("Error fetching all posts", ex);
            }
        }


        public async Task<Post> GetDetailsPost(int id)
        {
            var post = await _repository.GetPostById(id);
            if (post == null)
            {
                _logger.LogWarning($"Post with ID {id} not found.", id);
                throw new KeyNotFoundException($"Post with ID {id} was not found.");
            }
            CheckIdPost(id);
           try
            {
                return post;
            }
            catch (Exception ex) 
                {
                
                throw new Exception($"Error Get Post {id} In Service", ex); }
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

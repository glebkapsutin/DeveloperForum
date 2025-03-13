using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Application.Interfaces;
using server.Core.Models;

namespace server.Application.Services
{
    public class LikesService : ILikesService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILikesRepository _likesRepository;
        private readonly IPostRepository _postRepository;

        public LikesService(ILikesRepository likesRepository, IUserRepository userRepository, IPostRepository postRepository)
        {
            _likesRepository = likesRepository;
            _userRepository = userRepository;
            _postRepository = postRepository;
        }

        public async Task AddLike(int postId, int userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
                throw new KeyNotFoundException("Пользователь не найден.");

            var post = await _postRepository.GetPostById(postId);
            if (post == null)
                throw new KeyNotFoundException("Пост не найден.");


            await _likesRepository.Like(postId, userId);
        }

        public async Task RemoteLike(int postId, int userId)
        {
            var post = await _postRepository.GetPostById(postId);
            if (post == null)
                throw new KeyNotFoundException("Пост не найден.");

            await _likesRepository.Unlike(postId, userId);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Application.Interfaces;

namespace server.Application.Services
{
    public class LikesService : ILikesService
    {
        private readonly IUserRepository _userRepository;
       

        private readonly ILikesRepository _likesRepository;
        public LikesService(ILikesRepository likesRepository, IUserRepository userRepository)
        {
            _likesRepository = likesRepository;
            _userRepository = userRepository;

        }
        public async Task AddLike(int postId, int userId)
        {
            if (! _userRepository.UserExists(userId))
            throw new KeyNotFoundException("Пользователь не найден.");
    

            await _likesRepository.Like(userId, postId);
        }

        public async Task RemoteLike(int postId, int userId)
        {
            await _likesRepository.Unlike(userId, postId);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Application.Interfaces;


namespace server.Application.Services
{
    public class FollowsService : IFollowsService
    {
        private readonly IFollowsRepository _followsRepository;
        private readonly IUserRepository _userRepository;

        public FollowsService(IFollowsRepository followsRepository, IUserRepository userRepository)
        {
            _followsRepository = followsRepository;
            _userRepository = userRepository;
        }

        public async Task SubscribeAsync(int followerId, int followingId)
        {
            if(followerId == followingId)
            {
                throw new InvalidOperationException("Нельзя подписаться на самого себя.");
            }
            var follower = await _userRepository.UserExists(followerId);
            var following = await _userRepository.UserExists(followingId);

            if (!follower || !following)
            {
                throw new InvalidOperationException("Один из пользователей не найден");
            }
            await _followsRepository.AddFollowAsync(followerId, followingId);
        }

        public async Task UnsubscribeAsync(int followerId, int followingId)
        {
            await _followsRepository.RemoveFollowAsync(followerId,followingId);
        }
    }
}
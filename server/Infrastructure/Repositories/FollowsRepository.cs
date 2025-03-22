using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Application.Interfaces;
using server.Core.Models;
using server.Infrastructure.Data;

namespace server.Infrastructure.Repositories
{
    public class FollowsRepository : IFollowsRepository
    {
        private readonly DevelopForumDbContext _context;
        public FollowsRepository(DevelopForumDbContext context)
        {
            _context = context;
        }

        public async Task AddFollowAsync(int followerId, int followingId)
        {
            // Проверяем, существует ли уже подписка
            var existingFollow = await _context.Follows
                .FirstOrDefaultAsync(f => f.FollowerId == followerId && f.FollowingId == followingId);

            if (existingFollow != null)
            {
                return; // Подписка уже существует
            }

            var follow = new Follows
            {
                FollowerId = followerId,
                FollowingId = followingId
            };

            _context.Follows.Add(follow);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveFollowAsync(int followerId, int followingId)
        {
            var follow = await _context.Follows
                .FirstOrDefaultAsync(f => f.FollowerId == followerId && f.FollowingId == followingId);

            if (follow != null)
            {
                _context.Follows.Remove(follow);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Follows?> GetFollowAsync(int followerId, int followingId)
        {
            return await _context.Follows
                .FirstOrDefaultAsync(f => f.FollowerId == followerId && f.FollowingId == followingId);
        }
    }
}
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
    public class LikesRepository : ILikesRepository
    {
        private readonly DevelopForumDbContext _context;
        public LikesRepository(DevelopForumDbContext context)
        {
            _context = context;
        }

        public async Task Like(int postId, int userId)
        {
            // Проверяем, существует ли уже лайк
            var existingLike = await _context.Likes
                .FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == userId);

            if (existingLike != null)
            {
                return; // Лайк уже существует
            }

            // Загружаем пост и пользователя
            var post = await _context.Posts
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == postId);

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (post == null || user == null)
            {
                throw new KeyNotFoundException("Пост или пользователь не найден");
            }

            var like = new Likes
            {
                UserId = userId,
                PostId = postId,
                User = user,
                Post = post
            };

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();
        }

        public async Task Unlike(int postId, int userId)
        {
            var like = await _context.Likes
                .FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == userId);

            if (like != null)
            {
                _context.Likes.Remove(like);
                await _context.SaveChangesAsync();
            }
        }
    }
}
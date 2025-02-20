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
    public class LikesRepository :ILikesRepository
    {
        private readonly DevelopForumDbContext _context;
        public LikesRepository(DevelopForumDbContext context)
        {
            _context=context;

        }

        public async Task Like(int postId, int userId)
        {
            var like = new Likes
            {
                UserId=userId,
                PostId = postId
            };

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();
        }

        public async Task Unlike(int postId, int userId)
        {
             var like = await _context.Likes
            .FirstOrDefaultAsync(l => l.UserId == userId && l.PostId == postId);

            if (like != null)
            {
                _context.Likes.Remove(like);
                await _context.SaveChangesAsync();
            }
        }
    }
}
using Microsoft.EntityFrameworkCore;
using server.Application.Interfaces;
using server.Core.DTO;
using server.Core.Models;
using server.Infrastructure.Data;
namespace server.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DevelopForumDbContext _dbContext;

        public UserRepository(DevelopForumDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _dbContext.Users
                .Include(u => u.Role)
                .Include(u => u.Followers)
                    .ThenInclude(f => f.Follower)
                .Include(u => u.Followings)
                    .ThenInclude(f => f.Following)
                .Include(u => u.Posts)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        
        public async Task AddUserAsync(User user)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(UserDto userDto)
        {
            var existingUser = await _dbContext.Users.FindAsync(userDto.Id);
            if (existingUser == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            existingUser.UserName = userDto.Username;
            existingUser.Email = userDto.Email;
            existingUser.AvatarUrl = userDto.AvatarUrl ?? existingUser.AvatarUrl;
            existingUser.Bio = userDto.Bio;
            existingUser.Location = userDto.Location;
            existingUser.DataOfBirth = userDto.DataOfBirth;

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(User user)
        {
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> UserExists(int id)
        {
            return await _dbContext.Users.AnyAsync(x => x.Id == id);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
        }
    }
}

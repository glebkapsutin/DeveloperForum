using server.Core.DTO;
using server.Core.Models;
namespace server.Application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<UserDto?> GetUserDtoByIdAsync(int id, int currentUserId);
        Task<User> CreateUserAsync(User user);
        Task UpdateUserAsync(int id, User user);
        Task DeleteUserAsync(int id);
        Task<bool> UserExists(int id);
    }
}

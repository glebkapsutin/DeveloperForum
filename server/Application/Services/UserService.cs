using server.Application.Interfaces;
using server.Core.Models;
namespace server.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }

        public async Task<User> CreateUserAsync(User user)
        {
            await _userRepository.AddUserAsync(user);
            return user;
        }

        public async Task UpdateUserAsync(int id, User user)
        {
            if (id != user.Id)
            {
                throw new ArgumentException("Id doesn't match");
            }

            if (!await _userRepository.UserExists(id))
            {
                throw new KeyNotFoundException("User not found");
            }

            await _userRepository.UpdateUserAsync(user);
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            await _userRepository.DeleteUserAsync(user);
        }

        public async Task<bool> UserExists(int id)
        {
            return await _userRepository.UserExists(id);
        }
    }
}

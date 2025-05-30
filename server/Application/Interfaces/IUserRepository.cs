﻿using server.Core.DTO;
using server.Core.Models;
namespace server.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(UserDto user);
        Task DeleteUserAsync(User user);
        Task<bool> UserExists(int id);
        Task<User?> GetUserByEmailAsync(string email);
        
    }
}

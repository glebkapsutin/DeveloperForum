using server.Application.Interfaces;
using server.Core.Models;
using server.Application.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using server.Core.DTO;
using System.Security.Claims;

namespace server.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userService.GetUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserId(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Пользователь не авторизован" });
            }

            int currentUserId = int.Parse(userIdClaim.Value);
            var user = await _userService.GetUserDtoByIdAsync(id, currentUserId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User userItem)
        {
            if (userItem == null)
            {
                return BadRequest("User item is null");
            }

            var user = await _userService.CreateUserAsync(userItem);
            return CreatedAtAction(nameof(GetUserId), new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUserAsync(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutUser(int id, User userItem)
        {
            await _userService.UpdateUserAsync(id, userItem);
            return NoContent();
        }
        
        [HttpGet("current")]
        public async Task<ActionResult> GetCurrentUser()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Пользователь не авторизован" });
            }

            int userId = int.Parse(userIdClaim.Value);
            var user = await _userService.GetUserDtoByIdAsync(userId, userId);
            if (user == null)
            {
                return NotFound(new { message = "Пользователь не найден" });
            }
            return Ok(user);
        }
    }
}

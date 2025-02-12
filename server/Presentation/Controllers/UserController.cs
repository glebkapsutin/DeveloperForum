using server.Application.Interfaces;
using server.Core.Models;

using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<User>> GetUserId(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
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
    }
}

using server.Application.Interfaces;
using server.Core.Models;
using server.Core.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;



namespace server.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPosts()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized(new { message = "Пользователь не авторизован" });
            }

            var posts = await _postService.GetAllPosts(userId);
            return Ok(posts);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDTO>> GetPostById(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized(new { message = "Пользователь не авторизован" });
            }

            var post = await _postService.GetDetailsPost(id, userId);
            return Ok(post);
        }
        [HttpDelete("{id}")]

        public async Task<ActionResult<Post>> DeletePost(int id)
        {
            
                var posts = await _postService.RemovePost(id);
                return Ok(posts);
            
            
        }

        [HttpPost]
        public async Task<ActionResult<PostDTO>> CreatePost([FromBody] Post post)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized(new { message = "Пользователь не авторизован" });

            if (!int.TryParse(userIdClaim.Value, out int userId))
                return BadRequest(new { error = "Некорректный ID пользователя" });

            post.UserId = userId;

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdPost = await _postService.CreatePost(post);

            return CreatedAtAction(nameof(GetPostById), new { id = createdPost.Id }, createdPost);
        }

            
           

        
        [HttpPut("{id}")]
        public async Task<ActionResult<Post>> UpdatePost(int id, [FromBody] Post post)
        {
            if (id != post.Id)
            {
                return BadRequest("ID in URL does not match ID in body.");
            }
            
            
                var posts = await _postService.ModifyPost(post);
                return Ok(posts);
        

        }



    }
}

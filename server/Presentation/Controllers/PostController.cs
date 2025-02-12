using server.Application.Interfaces;
using server.Core.Models;

using Microsoft.AspNetCore.Mvc;



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
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
           
                var posts = await _postService.GetAllPosts();
                return Ok(posts);
            
           

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPostById(int id)
        {
           
                var posts = await _postService.GetDetailsPost(id);
                return Ok(posts);
            
           
        }
        [HttpDelete("{id}")]

        public async Task<ActionResult<Post>> DeletePost(int id)
        {
            
                var posts = await _postService.RemovePost(id);
                return Ok(posts);
            
            
        }

        [HttpPost]
        public async Task<ActionResult<Post>> CreatePost([FromBody] Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
                var CreatedPost = await _postService.CreatePost(post);
                return CreatedAtAction(nameof(GetPostById), new { id = CreatedPost.Id }, CreatedPost);
            
           

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
